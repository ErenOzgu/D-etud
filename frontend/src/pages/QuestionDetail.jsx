import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge, Avatar, Tag, Button } from '../components/common/Common';

export default function QuestionDetail({ questionId, onBack }) {
  const { questions, addAnswer, acceptAnswer, incrementView, addNotification } = useApp();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [ansText, setAnsText] = useState('');
  const didInc = useRef(false);

  const q = questions.find(x => x.id === questionId);

  useEffect(() => {
    if (q && !didInc.current) { incrementView(q.id); didInc.current = true; }
  }, [q]);

  if (!q) return null;

  const handleAnswer = () => {
    if (!ansText.trim()) { showToast('⚠️', 'Hata', 'Cevap metni boş olamaz.'); return; }
    addAnswer(q.id, {
      id: Date.now(),
      author: { name: user.name, initials: user.initials, color: '#7c6dfa' },
      body: ansText, time: 'Az önce', accepted: false,
    });
    setAnsText('');
    showToast('✅', 'Cevap gönderildi!', 'Cevabın başarıyla eklendi.');
    setTimeout(() => addNotification('💬', `"${q.title.slice(0, 40)}..." sorunuza yeni cevap geldi.`), 800);
  };

  const handleAccept = (aId) => {
    acceptAnswer(q.id, aId);
    showToast('⭐', 'Cevap kabul edildi!', 'En iyi cevabı seçtin.');
  };

  const isOwner = user?.name === q.author.name || user?.role === 'admin';

  const inputStyle = {
    width: '100%', background: 'var(--surface2)',
    border: '1px solid var(--border2)', borderRadius: 11,
    color: 'var(--text)', fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.93rem', padding: '0.8rem 1rem',
    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
  };

  return (
    <div style={{ maxWidth: 820, padding: '2rem 2.5rem 3rem', position: 'relative', zIndex: 1 }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted2)', fontSize: '0.88rem', cursor: 'pointer', marginBottom: '1.5rem', background: 'none', border: 'none', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = ''}>
        ← Sorulara Dön
      </button>

      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.03em', marginBottom: '1rem' }}>{q.title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--muted2)', fontSize: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Avatar initials={q.author.initials} color={q.author.color} size={28} />
        <span>{q.author.name}</span>
        <StatusBadge status={q.status} />
        <span>📐 {q.subject}</span>
        <span>🎓 {q.grade}</span>
        <span>👁 {q.views}</span>
        <span>🕐 {q.time}</span>
      </div>

      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem', lineHeight: 1.8, color: 'var(--muted2)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        {q.body}
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {q.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>

      {/* Answers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
        💬 Cevaplar
        <span style={{ background: 'var(--surface3)', padding: '0.2rem 0.6rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500 }}>{q.answers.length}</span>
      </div>

      {!q.answers.length
        ? <p style={{ color: 'var(--muted)', fontSize: '0.9rem', padding: '1rem 0' }}>Henüz cevap yok. İlk cevaplayan sen ol!</p>
        : q.answers.map((a, i) => (
          <div key={a.id} style={{ background: a.accepted ? '#4eeaa008' : 'var(--surface)', border: `1px solid ${a.accepted ? '#4eeaa030' : 'var(--border)'}`, borderRadius: 14, padding: '1.3rem', marginBottom: '0.8rem', animation: `fadeUp 0.3s ${i * 0.05}s ease both` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.8rem' }}>
              <Avatar initials={a.author.initials} color={a.author.color} size={32} />
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{a.author.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.76rem' }}>{a.time}</div>
              </div>
              {a.accepted && (
                <span style={{ marginLeft: 'auto', background: '#4eeaa015', color: 'var(--accent3)', fontSize: '0.75rem', padding: '0.25rem 0.7rem', borderRadius: '100px', border: '1px solid #4eeaa025' }}>✓ Kabul Edildi</span>
              )}
            </div>
            <div style={{ color: 'var(--muted2)', lineHeight: 1.7, fontSize: '0.93rem' }}>{a.body}</div>
            {!a.accepted && isOwner && (
              <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="success" size="sm" onClick={() => handleAccept(a.id)}>✓ Kabul Et</Button>
              </div>
            )}
          </div>
        ))
      }

      {/* Write Answer */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 16, padding: '1.5rem', marginTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>✍️ Cevap Yaz</h3>
        <textarea value={ansText} onChange={e => setAnsText(e.target.value)} placeholder="Cevabını buraya yaz..." rows={4} style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = ''} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
          <Button variant="primary" size="md" onClick={handleAnswer}>Cevabı Gönder →</Button>
        </div>
      </div>
    </div>
  );
}
