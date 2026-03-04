import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Common';
import { SUBJECTS } from '../../data/mockData';

export default function AskModal({ onClose }) {
  const [title, setTitle]     = useState('');
  const [body, setBody]       = useState('');
  const [subject, setSubject] = useState('matematik');
  const [grade, setGrade]     = useState('9. Sınıf');
  const { user } = useAuth();
  const { addQuestion } = useApp();
  const { showToast } = useToast();

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) { showToast('⚠️', 'Eksik bilgi', 'Başlık ve açıklama zorunludur.'); return; }
    addQuestion({ title, body, subject, grade, tags: [subject], author: { name: user.name, initials: user.initials, color: '#7c6dfa' }, time: 'Az önce' });
    showToast('✅', 'Soru yayınlandı!', 'Sorunuz başarıyla eklendi.');
    onClose();
  };

  const inputStyle = { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 11, color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.93rem', padding: '0.75rem 1rem', outline: 'none', transition: 'border-color 0.2s' };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: '#000000b0', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 540, animation: 'scaleIn 0.25s cubic-bezier(.34,1.2,.64,1)' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem' }}>✏️ Soru Sor</h2>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted2)', marginBottom: '0.45rem', fontWeight: 500 }}>Soru Başlığı</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Kısa ve net bir başlık..." style={inputStyle}
            onFocus={e => e.target.style.borderColor='var(--accent)'} onBlur={e => e.target.style.borderColor=''} />
        </div>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted2)', marginBottom: '0.45rem', fontWeight: 500 }}>Açıklama</label>
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Sorunuzu detaylı açıklayın..." rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={e => e.target.style.borderColor='var(--accent)'} onBlur={e => e.target.style.borderColor=''} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted2)', marginBottom: '0.45rem', fontWeight: 500 }}>Konu</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {SUBJECTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted2)', marginBottom: '0.45rem', fontWeight: 500 }}>Sınıf</label>
            <select value={grade} onChange={e => setGrade(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['9. Sınıf','10. Sınıf','11. Sınıf','12. Sınıf','Üniversite'].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'flex-end' }}>
          <Button variant="ghost" size="md" onClick={onClose}>İptal</Button>
          <Button variant="primary" size="md" onClick={handleSubmit}>Gönder →</Button>
        </div>
      </div>
    </div>
  );
}
