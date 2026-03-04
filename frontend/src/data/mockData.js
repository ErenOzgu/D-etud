export const MOCK_QUESTIONS = [
  {
    id: 1,
    title: "İntegral hesabında parçalı integral ne zaman kullanılır?",
    body: "Parçalı integral yöntemini ne zaman kullanmalıyım? Özellikle trigonometrik ve logaritmik fonksiyonlarda nasıl uygulanıyor?",
    subject: "matematik", grade: "12. Sınıf", status: "open",
    answers: [], views: 142,
    author: { name: "Eren Ö.", initials: "EÖ", color: "#7c6dfa" },
    time: "5 dk önce", tags: ["integral", "kalkülüs"],
  },
  {
    id: 2,
    title: "Newton'un 2. yasasını gerçek hayat örneğiyle açıklar mısınız?",
    body: "F=ma formülünü anlıyorum ama gerçek hayattan örneklerle daha iyi kavramak istiyorum.",
    subject: "fizik", grade: "10. Sınıf", status: "answered",
    answers: [
      { id: 1, author: { name: "Dr. Ayşe K.", initials: "AK", color: "#4eeaa0" }, body: "F=ma formülünde F kuvvet (Newton), m kütle (kg), a ise ivmedir (m/s²). Örnek: 10 kg alışveriş çantasını 2 m/s² ivmeyle iterseniz 20 N kuvvet uygulamanız gerekir.", time: "45 dk önce", accepted: true },
      { id: 2, author: { name: "Mert Y.", initials: "MY", color: "#facc15" }, body: "Araba freni de güzel bir örnek! 1000 kg araç 5 m/s² yavaşlıyorsa, frenlerin 5000 N kuvvet uyguladığı anlamına gelir.", time: "30 dk önce", accepted: false },
    ],
    views: 89,
    author: { name: "Ali K.", initials: "AK", color: "#4eeaa0" },
    time: "1 saat önce", tags: ["newton", "kuvvet"],
  },
  {
    id: 3,
    title: "Asit-baz tepkimelerinde indikatör nasıl çalışır?",
    body: "pH indikatörlerinin renk değiştirme mekanizmasını anlamak istiyorum.",
    subject: "kimya", grade: "11. Sınıf", status: "closed",
    answers: [
      { id: 1, author: { name: "Prof. Ali Y.", initials: "AY", color: "#fa6d8e" }, body: "İndikatörler zayıf asit veya baz özelliği gösteren organik bileşiklerdir. Fenolftalein örneği: asidik ortamda renksiz, bazik ortamda pembe.", time: "2 saat önce", accepted: true },
    ],
    views: 203,
    author: { name: "Selin T.", initials: "ST", color: "#fa6d8e" },
    time: "3 saat önce", tags: ["asit", "baz", "indikatör"],
  },
  {
    id: 4,
    title: "DNA replikasyonu ile transkripsiyonun farkı nedir?",
    body: "Her iki süreç de DNA içeriyor ama aralarındaki temel farkları kavrayamıyorum.",
    subject: "biyoloji", grade: "11. Sınıf", status: "open",
    answers: [], views: 67,
    author: { name: "Mert Y.", initials: "MY", color: "#facc15" },
    time: "3 saat önce", tags: ["dna", "genetik"],
  },
  {
    id: 5,
    title: "Türkçede büyük ünlü uyumu istisnalarını sayar mısınız?",
    body: "Büyük ünlü uyumuna uymayan kelimeleri ve bunların nedenlerini öğrenmek istiyorum.",
    subject: "türkçe", grade: "9. Sınıf", status: "answered",
    answers: [
      { id: 1, author: { name: "Öğrt. Fatma S.", initials: "FS", color: "#b0a8ff" }, body: "Yabancı kökenli sözcükler (kitap, kalem), birleşik sözcükler (bugün, biraz) ve bazı ekler (-yor, -ken, -ki) büyük ünlü uyumuna uymayabilir.", time: "4 saat önce", accepted: true },
    ],
    views: 311,
    author: { name: "Ayşe B.", initials: "AB", color: "#b0a8ff" },
    time: "5 saat önce", tags: ["dil bilgisi", "ses uyumu"],
  },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, icon: "💬", bg: "#7c6dfa15", msg: "\"İntegral hesabında...\" sorunuza yeni bir cevap geldi.", time: "2 dk önce", unread: true },
  { id: 2, icon: "✅", bg: "#4eeaa015", msg: "Cevabınız kabul edildi! Tebrikler 🎉", time: "1 saat önce", unread: true },
  { id: 3, icon: "⭐", bg: "#facc1515", msg: "\"Newton'un 2. yasası\" sorusu öne çıkarıldı.", time: "2 saat önce", unread: true },
  { id: 4, icon: "📢", bg: "#fa6d8e15", msg: "Sistem bakımı 25 Mart 02:00-04:00 arasında.", time: "1 gün önce", unread: false },
  { id: 5, icon: "💬", bg: "#7c6dfa15", msg: "\"Asit-baz tepkimeleri\" sorunuz cevaplandı.", time: "2 gün önce", unread: false },
];

export const MOCK_USERS = [
  { name: "Eren Özgü",      email: "eren@detud.com",  role: "student", active: true },
  { name: "Dr. Ayşe Kaya",  email: "ayse@detud.com",  role: "teacher", active: true },
  { name: "Mert Demir",     email: "mert@detud.com",  role: "student", active: true },
  { name: "Prof. Ali Yılmaz", email: "ali@detud.com", role: "teacher", active: false },
  { name: "Admin",          email: "admin@detud.com", role: "admin",   active: true },
];

export const LIVE_MESSAGES = [
  ["💬", "\"Newton'un 2. yasası\" sorusuna yeni cevap geldi."],
  ["👍", "Cevabın 3 kişi tarafından beğenildi."],
  ["🎓", "Dr. Ayşe Kaya sorunuzu inceliyor..."],
  ["💬", "\"DNA replikasyonu\" sorusuna cevap geldi."],
  ["⭐", "Cevabın öne çıkarıldı!"],
  ["🔔", "Matematik kategorisinde 5 yeni soru var."],
];

export const SUBJECTS = [
  { value: "matematik", label: "📐 Matematik" },
  { value: "fizik",     label: "⚡ Fizik" },
  { value: "kimya",     label: "🧪 Kimya" },
  { value: "biyoloji",  label: "🧬 Biyoloji" },
  { value: "türkçe",    label: "📖 Türkçe" },
  { value: "tarih",     label: "🏛️ Tarih" },
];
