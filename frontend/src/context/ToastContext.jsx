import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((icon, title, sub) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, icon, title, sub, leaving: false }]);
    setTimeout(() => dismiss(id), 4000);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', top: '72px', right: '1.5rem', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '0.6rem', pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: '14px',
            padding: '1rem 1.2rem',
            display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
            width: '320px', pointerEvents: 'all',
            boxShadow: '0 8px 32px #7c6dfa20',
            animation: t.leaving ? 'toastOut 0.3s ease both' : 'toastIn 0.35s cubic-bezier(.34,1.56,.64,1) both',
          }}>
            <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.87rem', fontWeight: 500, marginBottom: '0.2rem' }}>{t.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted2)', lineHeight: 1.4 }}>{t.sub}</div>
            </div>
            <button onClick={() => dismiss(t.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '1rem', lineHeight: 1, padding: 0, cursor: 'pointer' }}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
