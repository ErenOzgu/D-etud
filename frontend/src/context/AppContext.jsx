import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { MOCK_QUESTIONS, MOCK_NOTIFICATIONS, MOCK_USERS, LIVE_MESSAGES } from '../data/mockData';
import { useToast } from './ToastContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [questions, setQuestions]         = useState(MOCK_QUESTIONS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [users, setUsers]                 = useState(MOCK_USERS);
  const [unreadCount, setUnreadCount]     = useState(3);
  const liveIdx = useRef(0);
  const liveTimer = useRef(null);
  const { showToast } = useToast();

  // ─ Questions ─────────────────────────────────────
  const addQuestion = (q) => {
    setQuestions(prev => [{ ...q, id: Date.now(), answers: [], views: 0, time: 'Az önce', status: 'open' }, ...prev]);
  };

  const addAnswer = (qId, answer) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      return { ...q, answers: [...q.answers, answer], status: q.status === 'open' ? 'answered' : q.status };
    }));
  };

  const acceptAnswer = (qId, aId) => {
    setQuestions(prev => prev.map(q => {
      if (q.id !== qId) return q;
      return {
        ...q,
        status: 'closed',
        answers: q.answers.map(a => ({ ...a, accepted: a.id === aId })),
      };
    }));
  };

  const incrementView = (qId) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, views: q.views + 1 } : q));
  };

  // ─ Notifications ─────────────────────────────────
  const addNotification = (icon, msg) => {
    const n = { id: Date.now(), icon, bg: '#7c6dfa15', msg, time: 'Az önce', unread: true };
    setNotifications(prev => [n, ...prev]);
    setUnreadCount(c => c + 1);
    showToast(icon, 'Yeni bildirim', msg);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  // ─ Users ─────────────────────────────────────────
  const toggleUser = (name) => {
    setUsers(prev => prev.map(u => u.name === name ? { ...u, active: !u.active } : u));
  };

  // ─ Live simulation ────────────────────────────────
  const startLive = () => {
    liveTimer.current = setInterval(() => {
      const [icon, msg] = LIVE_MESSAGES[liveIdx.current % LIVE_MESSAGES.length];
      addNotification(icon, msg);
      liveIdx.current++;
    }, 8000);
  };

  const stopLive = () => {
    if (liveTimer.current) clearInterval(liveTimer.current);
  };

  return (
    <AppContext.Provider value={{
      questions, addQuestion, addAnswer, acceptAnswer, incrementView,
      notifications, addNotification, markAllRead, unreadCount,
      users, toggleUser,
      startLive, stopLive,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
