import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Common';

export default function NotificationsPage() {
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
          <div key={n.id} style={{
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            padding: '1rem 1.2rem',
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            borderLeft: n.unread ? '3px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: 12, marginBottom: '0.6rem',
            animation: `fadeUp 0.3s ${i * 0.04}s ease both`,
          }}>
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
