import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button, Spinner } from '../components/common/Common';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [tab, setTab]         = useState('login');
  const [role, setRole]       = useState('student');
  const [email, setEmail]     = useState('eren@detud.com');
  const [password, setPassword] = useState('123456');
  const [name, setName]       = useState('');
  const { login, quickLogin, register, loading } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    await login(email, password);
    showToast('👋', 'Hoş geldin!', 'D-etud\'a başarıyla giriş yaptın.');
  };

  const handleRegister = async () => {
    if (!name.trim()) { showToast('⚠️', 'Hata', 'Ad soyad giriniz.'); return; }
    await register({ name, email, role });
    showToast('🎉', 'Kayıt başarılı!', `Hoş geldin, ${name.split(' ')[0]}!`);
  };

  const handleQuickLogin = (r) => {
    quickLogin(r);
    showToast('👋', 'Hızlı giriş', r === 'student' ? 'Öğrenci olarak girdin.' : 'Öğretmen olarak girdin.');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>D<span>·</span>etud</div>
        <p className={styles.sub}>Öğrenciler ve öğretmenler için bilgi platformu</p>

        {/* Tabs */}
        <div className={styles.tabRow}>
          <button className={`${styles.tabBtn} ${tab === 'login' ? styles.tabActive : ''}`} onClick={() => setTab('login')}>Giriş Yap</button>
          <button className={`${styles.tabBtn} ${tab === 'register' ? styles.tabActive : ''}`} onClick={() => setTab('register')}>Kayıt Ol</button>
        </div>

        {/* LOGIN */}
        {tab === 'login' && (
          <div>
            <div className={styles.fg}>
              <label>E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@mail.com" />
            </div>
            <div className={styles.fg}>
              <label>Şifre</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button variant="primary" size="full" onClick={handleLogin} disabled={loading}>
              {loading ? <><Spinner />Giriş yapılıyor...</> : 'Giriş Yap →'}
            </Button>

            <div className={styles.divider}>ya da hızlı giriş</div>
            <div className={styles.roleGrid}>
              <div className={styles.roleOpt} onClick={() => handleQuickLogin('student')}>
                <div className={styles.rIcon}>🎓</div>
                <div className={styles.rLabel}>Öğrenci</div>
              </div>
              <div className={styles.roleOpt} onClick={() => handleQuickLogin('teacher')}>
                <div className={styles.rIcon}>👩‍🏫</div>
                <div className={styles.rLabel}>Öğretmen</div>
              </div>
            </div>
          </div>
        )}

        {/* REGISTER */}
        {tab === 'register' && (
          <div>
            <div className={styles.fg}>
              <label>Ad Soyad</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Adınız Soyadınız" />
            </div>
            <div className={styles.fg}>
              <label>E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@mail.com" />
            </div>
            <div className={styles.fg}>
              <label>Şifre</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="En az 6 karakter" />
            </div>
            <div className={styles.fg}>
              <label>Rol</label>
              <div className={styles.roleGrid}>
                <div className={`${styles.roleOpt} ${role === 'student' ? styles.roleSelected : ''}`} onClick={() => setRole('student')}>
                  <div className={styles.rIcon}>🎓</div>
                  <div className={styles.rLabel}>Öğrenci</div>
                </div>
                <div className={`${styles.roleOpt} ${role === 'teacher' ? styles.roleSelected : ''}`} onClick={() => setRole('teacher')}>
                  <div className={styles.rIcon}>👩‍🏫</div>
                  <div className={styles.rLabel}>Öğretmen</div>
                </div>
              </div>
            </div>
            <Button variant="primary" size="full" onClick={handleRegister} disabled={loading}>
              {loading ? <><Spinner />Kayıt yapılıyor...</> : 'Kayıt Ol →'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
