import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import AuthPage from './pages/AuthPage';
import AskModal from './components/common/AskModal';
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/QuestionsPage';
import QuestionDetail from './pages/QuestionDetail';
import NotificationsPage from './pages/NotificationsPage';
import AdminPage from './pages/AdminPage';
import './styles/globals.css';

export default function App() {
  const { user } = useAuth();
  const { startLive, stopLive } = useApp();
  const [page, setPage]         = useState('home');
  const [detailId, setDetailId] = useState(null);
  const [askOpen, setAskOpen]   = useState(false);

  useEffect(() => {
    if (user) { startLive(); return stopLive; }
  }, [user]);

  const navigate = (p) => { setPage(p); setDetailId(null); };

  const openDetail = (id) => { setDetailId(id); setPage('detay'); };

  if (!user) return <AuthPage />;

  return (
    <>
      <Navbar currentPage={page} onNavigate={navigate} />

      <main style={{ paddingTop: 60 }}>
        {page === 'home'         && <HomePage     onNavigate={navigate} onAsk={() => setAskOpen(true)} />}
        {page === 'sorular'      && <QuestionsPage onDetail={openDetail} onAsk={() => setAskOpen(true)} />}
        {page === 'detay'        && <QuestionDetail questionId={detailId} onBack={() => navigate('sorular')} />}
        {page === 'bildirimler'  && <NotificationsPage />}
        {page === 'admin'        && <AdminPage />}
      </main>

      {askOpen && <AskModal onClose={() => { setAskOpen(false); navigate('sorular'); }} />}
    </>
  );
}
