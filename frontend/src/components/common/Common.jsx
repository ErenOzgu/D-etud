import styles from './Common.module.css';

/* ─── BUTTON ─── */
export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, style }) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}

/* ─── BADGE ─── */
const badgeMap = { open: 'bOpen', answered: 'bAnswered', closed: 'bClosed' };

export function StatusBadge({ status }) {
  const labels = { open: 'Açık', answered: 'Cevaplandı', closed: 'Kapalı' };
  return <span className={`${styles.badge} ${styles[badgeMap[status]]}`}>{labels[status]}</span>;
}

export function RoleBadge({ role }) {
  const labels  = { student: 'Öğrenci', teacher: 'Öğretmen', admin: 'Admin' };
  const classes = { student: styles.rbStudent, teacher: styles.rbTeacher, admin: styles.rbAdmin };
  return <span className={`${styles.badge} ${classes[role]}`}>{labels[role]}</span>;
}

/* ─── AVATAR ─── */
export function Avatar({ initials, color = '#7c6dfa', size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color + '22', color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.28, fontWeight: 700,
      fontFamily: 'Syne, sans-serif', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

/* ─── TAG ─── */
export function Tag({ children }) {
  return (
    <span style={{
      background: 'var(--surface3)', color: 'var(--muted2)',
      fontSize: '0.72rem', padding: '0.18rem 0.55rem', borderRadius: '6px',
    }}>
      {children}
    </span>
  );
}

/* ─── SPINNER ─── */
export function Spinner() {
  return (
    <span style={{
      display: 'inline-block', width: 16, height: 16,
      border: '2px solid #ffffff30', borderTopColor: '#fff',
      borderRadius: '50%', animation: 'spin 0.7s linear infinite',
      verticalAlign: 'middle', marginRight: 6,
    }} />
  );
}

/* ─── EMPTY STATE ─── */
export function Empty({ icon = '🔍', text = 'Sonuç bulunamadı.' }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--muted)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
      <p>{text}</p>
    </div>
  );
}
