import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge, Avatar, Tag, Button, Empty } from '../components/common/Common';
import { SUBJECTS } from '../data/mockData';

export default function QuestionsPage({ onDetail, onAsk }) {
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Soru ara..."
              style={{ background: 'none', border: 'none', color: 'var(--text)', fontSize: '0.9rem', outline: 'none', width: '100%' }} />
          </div>
          <Button variant="primary" size="md" onClick={onAsk}>+ Soru Sor</Button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0 2.5rem 1.2rem', flexWrap: 'wrap' }}>
        {[{ value: 'tümü', label: 'Tümü' }, ...SUBJECTS].map(s => (
          <button key={s.value} onClick={() => setFilter(s.value)} style={{
            background: filter === s.value ? 'var(--accent)' : 'var(--surface2)',
            border: `1px solid ${filter === s.value ? 'var(--accent)' : 'var(--border)'}`,
            color: filter === s.value ? '#fff' : 'var(--muted2)',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem',
            padding: '0.35rem 0.9rem', borderRadius: '100px',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
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
