// ─── HOME PAGE ───────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { Button } from '../components/common/Common';

export function HomePage({ onNavigate, onAsk }) {
  const counters = [
    { id: 'c1', target: 12840, label: 'Aktif Öğrenci' },
    { id: 'c2', target: 84710, label: 'Cevaplanan Soru' },
    { id: 'c3', target: 342,   label: 'Uzman Öğretmen' },
    { id: 'c4', target: 8,     label: 'Konu Kategorisi' },
  ];

  useEffect(() => {
    counters.forEach(({ id, target }) => {
      const el = document.getElementById(id);
      if (!el) return;
      let cur = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur.toLocaleString('tr');
        if (cur >= target) clearInterval(t);
      }, 18);
    });
  }, []);

  const features = [
    { icon: '💬', color: '#7c6dfa15', title: 'Anında Cevap',     desc: 'Sorularını gönder, öğretmenler gerçek zamanlı cevaplasın.' },
    { icon: '🎯', color: '#fa6d8e15', title: 'Konu Bazlı',        desc: 'Matematik, fizik, kimya... İstediğin konuda uzmanını bul.' },
    { icon: '🔔', color: '#4eeaa015', title: 'Canlı Bildirim',    desc: 'Sorun cevaplanınca Socket.IO ile anında haberdar ol.' },
    { icon: '⭐', color: '#facc1515', title: 'En İyi Cevap',      desc: 'En doğru cevabı kabul et, topluluğa yol göster.' },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* HERO */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '5rem 2rem 3rem', gap: '1.2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#7c6dfa10', border: '1px solid #7c6dfa28', color: '#b0a8ff', fontSize: '0.78rem', fontWeight: 500, padding: '0.35rem 1rem', borderRadius: '100px', animation: 'fadeDown 0.5s ease both' }}>
          ✦ Türkiye'nin eğitim platformu
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', maxWidth: 750, animation: 'fadeUp 0.5s 0.1s ease both' }}>
          Sorularını sor,<br />
          <span style={{ background: 'linear-gradient(135deg, #7c6dfa, #fa6d8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>anında cevap al</span>
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.7, animation: 'fadeUp 0.5s 0.15s ease both' }}>
          Öğretmenler ve uzmanlardan gerçek zamanlı yardım. Matematik, fizik, kimya ve daha fazlası.
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', animation: 'fadeUp 0.5s 0.2s ease both' }}>
          <Button variant="primary" size="lg" onClick={() => onNavigate('sorular')}>Soruları Keşfet</Button>
          <Button variant="ghost"   size="lg" onClick={onAsk}>+ Soru Sor</Button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', padding: '2.5rem 2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', animation: 'fadeUp 0.5s 0.25s ease both' }}>
        {counters.map(c => (
          <div key={c.id} style={{ textAlign: 'center' }}>
            <div id={c.id} style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800 }}>0</div>
            <div style={{ color: 'var(--muted2)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', padding: '3rem 2.5rem', maxWidth: 1000, margin: '0 auto' }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.6rem', transition: 'all 0.3s', animation: `fadeUp 0.5s ${i * 0.05}s ease both` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#7c6dfa22'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px #7c6dfa0c'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=''; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 11, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
            <p style={{ color: 'var(--muted2)', fontSize: '0.87rem', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── QUESTIONS PAGE ──────────────────────────────────────────────────────────
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge, Avatar, Tag, Button, Empty } from '../components/common/Common';
import { SUBJECTS } from '../data/mockData';

export function QuestionsPage({ onDetail, onAsk }) {
  const { questions } = useApp();
  const [filter, setFilter] = useState('tümü');
  const [search, setSearch] = useState('');

  const filtered = questions.filter(q =>
    (filter === 'tümü' || q.subject === filter) &&
    (!search || q.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 2.5rem 1.2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Sorular</h1>
        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 11, padding: '0.55rem 1rem', width: 260 }}>
            <span style={{ color: 'var(--muted)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Soru ara..." style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '0.9rem', outline: 'none', width: '100%' }} />
          </div>
          <Button variant="primary" size="md" onClick={onAsk}>+ Soru Sor</Button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0 2.5rem 1.2rem', flexWrap: 'wrap' }}>
        {[{ value: 'tümü', label: 'Tümü' }, ...SUBJECTS].map(s => (
          <button key={s.value} onClick={() => setFilter(s.value)} style={{ background: filter === s.value ? 'var(--accent)' : 'var(--surface2)', border: `1px solid ${filter === s.value ? 'var(--accent)' : 'var(--border)'}`, color: filter === s.value ? '#fff' : 'var(--muted2)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', padding: '0.35rem 0.9rem', borderRadius: '100px', cursor: 'pointer', transition: 'all 0.2s' }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ padding: '0 2.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: 860 }}>
        {!filtered.length ? <Empty /> : filtered.map((q, i) => (
          <div key={q.id} onClick={() => onDetail(q.id)} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.4rem', cursor: 'pointer', transition: 'all 0.25s', animation: `fadeUp 0.35s ${i * 0.04}s ease both` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#7c6dfa20'; e.currentTarget.style.transform='translateX(5px)'; e.currentTarget.style.boxShadow='inset 3px 0 0 var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=''; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.97rem', fontWeight: 700, lineHeight: 1.4 }}>{q.title}</div>
              <StatusBadge status={q.status} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--muted)', fontSize: '0.8rem', flexWrap: 'wrap' }}>
              <Avatar initials={q.author.initials} color={q.author.color} size={24} />
              <span>{q.author.name}</span>
              <span>💬 {q.answers.length} cevap</span>
              <span>👁 {q.views}</span>
              <span>🕐 {q.time}</span>
              {q.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── QUESTION DETAIL ────────────────────────────────────────────────────────
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function QuestionDetail({ questionId, onBack }) {
  const { questions, addAnswer, acceptAnswer, incrementView, addNotification } = useApp();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [ansText, setAnsText] = useState('');
  const didInc = useRef(false);

  const q = questions.find(x => x.id === questionId);

  useEffect(() => {
    if (q && !didInc.current) { incrementView(q.id); didInc.current = true; }
  }, [q?.id]);

  if (!q) return null;

  const handleAnswer = () => {
    if (!ansText.trim()) { showToast('⚠️', 'Hata', 'Cevap metni boş olamaz.'); return; }
    addAnswer(q.id, { id: Date.now(), author: { name: user.name, initials: user.initials, color: '#7c6dfa' }, body: ansText, time: 'Az önce', accepted: false });
    setAnsText('');
    showToast('✅', 'Cevap gönderildi!', 'Cevabın başarıyla eklendi.');
    setTimeout(() => addNotification('💬', `"${q.title.slice(0, 40)}..." sorunuza yeni cevap geldi.`), 800);
  };

  const handleAccept = (aId) => {
    acceptAnswer(q.id, aId);
    showToast('⭐', 'Cevap kabul edildi!', 'En iyi cevabı seçtin.');
  };

  const isOwner = user?.name === q.author.name || user?.role === 'admin';

  return (
    <div style={{ maxWidth: 820, padding: '2rem 2.5rem 3rem', position: 'relative', zIndex: 1 }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted2)', fontSize: '0.88rem', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '1.5rem', background: 'none', border: 'none', fontFamily: 'DM Sans, sans-serif' }}
        onMouseEnter={e => e.currentTarget.style.color='var(--text)'} onMouseLeave={e => e.currentTarget.style.color=''}>
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

      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem', lineHeight: 1.8, color: 'var(--muted2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
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

      {!q.answers.length ? (
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', padding: '1rem 0' }}>Henüz cevap yok. İlk cevaplayan sen ol!</p>
      ) : (
        q.answers.map((a, i) => (
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
      )}

      {/* Write Answer */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 16, padding: '1.5rem', marginTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>✍️ Cevap Yaz</h3>
        <textarea value={ansText} onChange={e => setAnsText(e.target.value)} placeholder="Cevabını buraya yaz..." rows={4}
          style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 11, color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.93rem', padding: '0.8rem 1rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderColor='var(--accent)'} onBlur={e => e.target.style.borderColor=''} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
          <Button variant="primary" size="md" onClick={handleAnswer}>Cevabı Gönder →</Button>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS PAGE ─────────────────────────────────────────────────────
export function NotificationsPage() {
  const { notifications, markAllRead } = useApp();

  useEffect(() => { markAllRead(); }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 2.5rem 1.5rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Bildirimler</h1>
        <Button variant="ghost" size="sm" onClick={markAllRead}>Tümünü okundu işaretle</Button>
      </div>
      <div style={{ maxWidth: 700, padding: '0 2.5rem 3rem' }}>
        {notifications.map((n, i) => (
          <div key={n.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.2rem', background: 'var(--surface)', border: `1px solid ${n.unread ? 'transparent' : 'var(--border)'}`, borderLeft: n.unread ? '3px solid var(--accent)' : '1px solid var(--border)', borderRadius: 12, marginBottom: '0.6rem', animation: `fadeUp 0.3s ${i * 0.04}s ease both`, transition: 'all 0.2s' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{n.icon}</div>
            <div>
              <div style={{ fontSize: '0.9rem', lineHeight: 1.45 }}>{n.msg}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.77rem', marginTop: '0.25rem' }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ─────────────────────────────────────────────────────────────
export function AdminPage() {
  const { users, toggleUser, addNotification } = useApp();
  const { showToast } = useToast();

  const stats = [
    { label: 'Toplam Kullanıcı', value: '1,284', color: '#b0a8ff', change: '↑ +42 bu hafta', up: true },
    { label: 'Toplam Soru',      value: '8,471', color: 'var(--accent3)', change: '↑ +128 bu hafta', up: true },
    { label: 'Açık Soru',        value: '247',   color: 'var(--warn)',    change: '↓ -12 dün',      up: false },
    { label: 'Cevap Oranı',      value: '94%',   color: 'var(--accent2)', change: '↑ +2% bu ay',   up: true },
  ];

  const handleBroadcast = () => {
    const msg = prompt('Tüm kullanıcılara gönderilecek duyuru:');
    if (msg?.trim()) {
      addNotification('📢', msg.trim());
      showToast('📢', 'Duyuru gönderildi', `${users.length} kullanıcıya iletildi.`);
    }
  };

  const handleToggle = (name) => {
    const u = users.find(x => x.name === name);
    toggleUser(name);
    showToast(u.active ? '⛔' : '✅', name, `Hesap ${u.active ? 'devre dışı bırakıldı' : 'aktif edildi'}.`);
  };

  const avatarColors = { teacher: '#4eeaa0', admin: '#fa6d8e', student: '#b0a8ff' };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 2.5rem 1.5rem' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Admin Paneli</h1>
        <Button variant="primary" size="md" onClick={handleBroadcast}>📢 Duyuru Gönder</Button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', padding: '0 2.5rem 2rem' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.4rem', animation: `fadeUp 0.4s ${i * 0.05}s ease both` }}>
            <div style={{ color: 'var(--muted2)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{s.label}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.9rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.78rem', marginTop: '0.3rem', color: s.up ? 'var(--accent3)' : 'var(--accent2)' }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Users */}
      <div style={{ padding: '0 2.5rem 2rem', maxWidth: 900 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>Kullanıcı Yönetimi</div>
        {users.map(u => {
          const c = avatarColors[u.role];
          const initials = u.name.split(' ').map(x => x[0]).join('').slice(0, 2);
          return (
            <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.85rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 11, marginBottom: '0.5rem', transition: 'all 0.2s' }}>
              <Avatar initials={initials} color={c} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '0.92rem' }}>{u.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '0.1rem' }}>{u.email}</div>
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.22rem 0.7rem', borderRadius: '100px', background: c + '20', color: c }}>
                {u.role === 'student' ? 'Öğrenci' : u.role === 'teacher' ? 'Öğretmen' : 'Admin'}
              </span>
              <span style={{ fontSize: '0.8rem', color: u.active ? 'var(--accent3)' : 'var(--accent2)' }}>{u.active ? '● Aktif' : '● Pasif'}</span>
              {u.role !== 'admin' && (
                <Button variant={u.active ? 'danger' : 'success'} size="sm" onClick={() => handleToggle(u.name)}>
                  {u.active ? 'Devre Dışı' : 'Aktif Et'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
