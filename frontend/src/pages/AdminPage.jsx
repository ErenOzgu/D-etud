import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { Avatar, Button } from '../components/common/Common';

const stats = [
  { label: 'Toplam Kullanıcı', value: '1,284', color: '#b0a8ff',        change: '↑ +42 bu hafta',  up: true },
  { label: 'Toplam Soru',      value: '8,471', color: 'var(--accent3)', change: '↑ +128 bu hafta', up: true },
  { label: 'Açık Soru',        value: '247',   color: 'var(--warn)',    change: '↓ -12 dün',       up: false },
  { label: 'Cevap Oranı',      value: '94%',   color: 'var(--accent2)', change: '↑ +2% bu ay',    up: true },
];

const avatarColors = { teacher: '#4eeaa0', admin: '#fa6d8e', student: '#b0a8ff' };

export default function AdminPage() {
  const { users, toggleUser, addNotification } = useApp();
  const { showToast } = useToast();

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
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
          Kullanıcı Yönetimi
        </div>
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
              <span style={{ fontSize: '0.8rem', color: u.active ? 'var(--accent3)' : 'var(--accent2)' }}>
                {u.active ? '● Aktif' : '● Pasif'}
              </span>
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
