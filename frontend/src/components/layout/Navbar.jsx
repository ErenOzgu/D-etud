import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Common';
import styles from './Navbar.module.css';

export default function Navbar({ currentPage, onNavigate }) {
  const { user, logout } = useAuth();
  const { unreadCount } = useApp();

  const links = [
    { id: 'home',         label: 'Ana Sayfa' },
    { id: 'sorular',      label: 'Sorular' },
    { id: 'bildirimler',  icon: '🔔', label: 'Bildirimler', badge: unreadCount },
    ...(user?.role === 'admin' || user?.role === 'teacher'
      ? [{ id: 'admin', icon: '⚙️', label: 'Admin' }]
      : []),
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => onNavigate('home')}>
        D<span>·</span>etud
      </div>

      <ul className={styles.links}>
        {links.map(link => (
          <li key={link.id}>
            <button
              className={`${styles.navBtn} ${currentPage === link.id ? styles.active : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              {link.icon && <span>{link.icon}</span>}
              <span className={link.icon ? styles.iconLabel : undefined}>{link.label}</span>
              {link.badge > 0 && (
                <span className={styles.badge}>{link.badge}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <div className={styles.userPill} onClick={logout} title="Çıkış yap">
          <Avatar initials={user?.initials} color={user?.tc || '#b0a8ff'} size={28} />
          <span className={styles.uname}>{user?.name}</span>
          <span className={styles.exitIcon}>↗</span>
        </div>
      </div>
    </nav>
  );
}
