# 📚 Dijital Etüt

Öğrencilerin öğretmen ve eğitmenlerinden uzaktan soru sorup cevap alabildiği mobil-first eğitim platformu.

## 🏗️ Proje Yapısı

```
dijital-etut/
├── backend/          # Node.js + Express REST API
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       └── config/
├── frontend/         # React SPA
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── services/
└── docs/
```

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js >= 18
- MongoDB >= 6
- npm veya yarn

### Backend

```bash
cd backend
cp .env.example .env     # .env dosyasını düzenle
npm install
npm run dev              # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start                # http://localhost:3000
```

## 🔑 API Endpoint'leri

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| POST | `/api/auth/register` | Kayıt ol | ❌ |
| POST | `/api/auth/login` | Giriş yap | ❌ |
| GET | `/api/auth/me` | Profil bilgisi | ✅ |
| GET | `/api/questions` | Sorular listesi | ❌ |
| POST | `/api/questions` | Soru oluştur | ✅ |
| POST | `/api/questions/:id/answers` | Cevap ekle | ✅ |
| PUT | `/api/questions/:id/answers/:aId/accept` | Cevap kabul et | ✅ |
| GET | `/api/notifications` | Bildirimler | ✅ |
| GET | `/api/admin/stats` | İstatistikler | 🔐 Admin |
| GET | `/api/admin/users` | Kullanıcılar | 🔐 Admin |

## 🧩 Modüller

- **User Auth** — JWT tabanlı kayıt/giriş, roller: `student`, `teacher`, `admin`
- **Soru-Cevap** — Konu/sınıf filtreli sorular, cevap kabul mekanizması
- **Admin Panel** — Kullanıcı yönetimi, istatistikler, öne çıkarma
- **Bildirimler** — Socket.IO ile gerçek zamanlı bildirim sistemi

## 🛠️ Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Backend | Node.js, Express |
| Veritabanı | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Realtime | Socket.IO |
| Frontend | React 18, React Router v6 |
| HTTP Client | Axios |

## 📝 Lisans
MIT
