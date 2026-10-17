import { useEffect } from 'react';
import { Button } from '../components/common/Common';

const counters = [
  { id: 'c1', target: 12840, label: 'Aktif Öğrenci' },
  { id: 'c2', target: 84710, label: 'Cevaplanan Soru' },
  { id: 'c3', target: 342,   label: 'Uzman Öğretmen' },
  { id: 'c4', target: 8,     label: 'Konu Kategorisi' },
];

const features = [
  { icon: '💬', color: '#7c6dfa15', title: 'Anında Cevap',  desc: 'Sorularını gönder, öğretmenler gerçek zamanlı cevaplasın.' },
  { icon: '🎯', color: '#fa6d8e15', title: 'Konu Bazlı',    desc: 'Matematik, fizik, kimya... İstediğin konuda uzmanını bul.' },
  { icon: '🔔', color: '#4eeaa015', title: 'Canlı Bildirim',desc: 'Sorun cevaplanınca Socket.IO ile anında haberdar ol.' },
  { icon: '⭐', color: '#facc1515', title: 'En İyi Cevap',  desc: 'En doğru cevabı kabul et, topluluğa yol göster.' },
];

export default function HomePage({ onNavigate, onAsk }) {
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

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* HERO */}
      <div className="home-hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '5rem 2rem 3rem', gap: '1.2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#7c6dfa10', border: '1px solid #7c6dfa28', color: '#b0a8ff', fontSize: '0.78rem', fontWeight: 500, padding: '0.35rem 1rem', borderRadius: '100px', animation: 'fadeDown 0.5s ease both' }}>
          ✦ Türkiye'nin eğitim platformu
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', maxWidth: 750, animation: 'fadeUp 0.5s 0.1s ease both' }}>
          Sorularını sor,<br />
          <span style={{ background: 'linear-gradient(135deg, #7c6dfa, #fa6d8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            anında cevap al
          </span>
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '1.05rem', maxWidth: 480, lineHeight: 1.7, animation: 'fadeUp 0.5s 0.15s ease both' }}>
          Öğretmenler ve uzmanlardan gerçek zamanlı yardım. Matematik, fizik, kimya ve daha fazlası.
        </p>
        <div className="home-actions" style={{ display: 'flex', gap: '0.8rem', animation: 'fadeUp 0.5s 0.2s ease both' }}>
          <Button variant="primary" size="lg" onClick={() => onNavigate('sorular')}>Soruları Keşfet</Button>
          <Button variant="ghost"   size="lg" onClick={onAsk}>+ Soru Sor</Button>
        </div>
      </div>

      {/* STATS */}
      <div className="home-stats" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', padding: '2.5rem 2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', animation: 'fadeUp 0.5s 0.25s ease both' }}>
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
