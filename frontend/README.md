# ModalIn Frontend

> Platform Analisis Kelayakan Kredit UMKM Berbasis AI — Frontend Application

## 🛠 Tech Stack

| Teknologi          | Fungsi                            |
| ------------------ | --------------------------------- |
| **React.js**       | Library UI utama                  |
| **Vite**           | Module bundler & dev server       |
| **Tailwind CSS**   | Utility-first CSS framework       |
| **React Router DOM** | Client-side routing (SPA)       |
| **Axios**          | HTTP client untuk networking calls |
| **Lucide React**   | Icon library                      |

## 📁 Struktur Folder

```
frontend/
├── public/
├── src/
│   ├── assets/              # Logo, gambar, ilustrasi
│   ├── components/
│   │   ├── common/          # Komponen reusable (Button, Input, Card)
│   │   ├── layout/          # Layout (Sidebar, PublicLayout, AuthLayout, DashboardLayout)
│   │   └── ui/              # Komponen visual (ScoreRing, ProgressBar, StatCard)
│   ├── pages/
│   │   ├── public/          # LandingPage
│   │   ├── auth/            # LoginPage, RegisterPage
│   │   ├── onboarding/      # BusinessDataPage, FinancialDataPage
│   │   ├── dashboard/       # DashboardPage
│   │   ├── score/           # ScoreExplainabilityPage
│   │   ├── history/         # ScoreHistoryPage, FinancialImportPage
│   │   └── profile/         # ProfilePage
│   ├── routes/              # Konfigurasi React Router
│   ├── services/            # Axios instance & API service placeholder
│   ├── data/                # Mock data untuk pengembangan
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── constants/           # Route paths, sidebar menu, warna, label 5C
│   ├── styles/              # CSS tambahan (animasi, dll)
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi backend:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173/`.

### 4. Build untuk Production

```bash
npm run build
```

Output build akan tersedia di folder `dist/`.

### 5. Preview Build

```bash
npm run preview
```

## 🌐 Deployment

Project ini siap dideploy ke layanan hosting statis:

### Vercel

1. Connect repository GitHub ke Vercel
2. Set **Root Directory** ke `frontend`
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Tambahkan environment variable `VITE_API_BASE_URL`

### Netlify

1. Connect repository GitHub ke Netlify
2. Set **Base Directory**: `frontend`
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `frontend/dist`
5. Tambahkan file `_redirects` di `public/` dengan isi:
   ```
   /*    /index.html   200
   ```
6. Tambahkan environment variable `VITE_API_BASE_URL`

## 🎨 Brand Colors

| Warna      | Hex       | Penggunaan              |
| ---------- | --------- | ----------------------- |
| Primary    | `#0891B2` | Warna utama / CTA       |
| Secondary  | `#5B4FCF` | Warna aksen             |
| Background | `#F8FAFC` | Latar belakang halaman  |
| Sidebar    | `#EAF6FF` | Latar belakang sidebar  |
| Success    | `#10B981` | Status berhasil         |
| Warning    | `#F59E0B` | Status peringatan       |
| Danger     | `#EF4444` | Status error            |

## 📋 Available Routes

| Route                  | Halaman                  | Layout         |
| ---------------------- | ------------------------ | -------------- |
| `/`                    | Landing Page             | PublicLayout   |
| `/login`               | Login                    | AuthLayout     |
| `/register`            | Register                 | AuthLayout     |
| `/onboarding/business` | Data Bisnis              | DashboardLayout |
| `/onboarding/financial`| Data Keuangan            | DashboardLayout |
| `/dashboard`           | Dashboard                | DashboardLayout |
| `/score`               | Skor & Explainability    | DashboardLayout |
| `/score/history`       | Riwayat Skor             | DashboardLayout |
| `/score/import`        | Import Data Keuangan     | DashboardLayout |
| `/profile`             | Profil                   | DashboardLayout |

## 📝 Catatan

- Semua API service menggunakan **Axios** dengan konfigurasi base URL dari environment variable
- Mock data tersedia di `src/data/mockData.js` untuk pengembangan tanpa backend
- Tailwind CSS dikonfigurasi menggunakan **v4** dengan `@theme` directive
- Project menggunakan **Vite** sebagai module bundler (bukan Webpack/CRA)
