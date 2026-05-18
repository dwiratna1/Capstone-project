# ModalIn Backend

RESTful API backend untuk project capstone Dicoding ModalIn.

ModalIn membantu UMKM mengetahui kelayakan kredit menggunakan alternative credit scoring berbasis data usaha, data keuangan, transaksi digital, reputasi toko, histori skor, dan kelengkapan profil. Backend ini berperan sebagai orchestrator dan system of record: menerima request dari frontend, menyimpan data ke PostgreSQL melalui Prisma, lalu memanggil FastAPI AI service untuk perhitungan skor.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Bcrypt
- Multer
- Axios
- CORS
- Dotenv

## Setup Lokal

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npx prisma migrate dev --name init
npm run dev
```

Server default berjalan di:

```text
http://localhost:5000
```

Health check:

```http
GET /api/health
```

Expected response:

```json
{
  "status": "success",
  "message": "ModalIn backend is running"
}
```

## Environment Variables

Lihat `.env.example` untuk template lengkap.

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/modalin?schema=public"
CORS_ORIGIN=http://localhost:5173
JWT_SECRET="replace-with-a-long-random-secret"
JWT_EXPIRES_IN=7d
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_TIMEOUT_MS=15000
```

Catatan:

- `DATABASE_URL` harus disesuaikan dengan user, password, host, port, dan nama database PostgreSQL lokal.
- `JWT_SECRET` wajib diisi agar endpoint auth dan route protected berjalan.
- `AI_SERVICE_URL` dipakai oleh `POST /api/scores/calculate` untuk memanggil FastAPI AI service pada path `/predict`.

## Arsitektur Singkat

```text
React/Vite Frontend
  -> Express REST API
    -> PostgreSQL via Prisma
    -> FastAPI AI Service via Axios
```

Backend menyimpan:

- User dan password hash
- Profil usaha
- Profil keuangan
- Platform dummy connected/disconnected
- Riwayat skor
- Breakdown 5C
- Faktor explainability
- Rekomendasi
- Raw response AI

## Flow Utama

1. User register atau login.
2. Frontend menyimpan JWT.
3. Frontend mengirim onboarding business dan financial dengan header `Authorization: Bearer <token>`.
4. Backend menyimpan data onboarding ke PostgreSQL.
5. Frontend memanggil `POST /api/scores/calculate`.
6. Backend mengambil snapshot data user, membuat row score `PENDING`, memanggil FastAPI `/predict`, lalu menyimpan hasil skor.
7. Frontend membaca dashboard, score, explainability, history, dan profile dari endpoint backend.

## Endpoint Ringkas

Base URL lokal:

```text
http://localhost:5000/api
```

Public:

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`

Protected dengan JWT:

- `GET /auth/me`
- `POST /onboarding/business`
- `POST /onboarding/financial`
- `POST /scores/calculate`
- `GET /scores/current`
- `GET /scores/history`
- `GET /scores/explainability`
- `GET /dashboard`
- `GET /dashboard/summary`
- `GET /dashboard/activities`
- `GET /dashboard/recommendations`
- `GET /profile`
- `PUT /profile`
- `PUT /profile/business`
- `PUT /profile/financial`

Detail contract:

- [API Contract](docs/API_CONTRACT.md)
- [AI Service Contract](docs/AI_SERVICE_CONTRACT.md)

## Manual Testing Flow

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Dwi Ratna\",\"email\":\"dwi@example.com\",\"password\":\"password123\"}"
```

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"dwi@example.com\",\"password\":\"password123\"}"
```

Gunakan token dari response:

```http
Authorization: Bearer <token>
```

Urutan test manual yang disarankan:

1. `POST /api/auth/register`
2. `POST /api/auth/login`
3. `POST /api/onboarding/business`
4. `POST /api/onboarding/financial`
5. Jalankan FastAPI/mock AI service di `AI_SERVICE_URL`
6. `POST /api/scores/calculate`
7. `GET /api/dashboard`
8. `GET /api/profile`

`POST /api/scores/calculate` akan gagal `503` jika FastAPI/mock AI service belum aktif. Ini behavior yang disengaja; backend tidak membuat skor dummy saat AI gagal.

## Struktur Folder

```text
backend/
|- prisma/
|  |- migrations/
|  `- schema.prisma
|- src/
|  |- app.js
|  |- server.js
|  |- config/
|  |- routes/
|  |- controllers/
|  |- services/
|  |- middlewares/
|  `- utils/
|- docs/
|  |- API_CONTRACT.md
|  `- AI_SERVICE_CONTRACT.md
|- .env.example
|- package.json
`- README.md
```

## NPM Scripts

```bash
npm run dev              # run server with nodemon
npm start                # run server with node
npm run prisma:generate  # generate Prisma Client
npm run prisma:migrate   # run prisma migrate dev
npm run prisma:studio    # open Prisma Studio
```

## Catatan MVP

- Integrasi bank, e-wallet, marketplace, dan OAuth pihak ketiga belum dibuat.
- Platform connection masih simulasi status connected/disconnected.
- FastAPI AI service asli belum ada di repo backend ini.
- Tidak ada rule-based scoring fallback di backend; jika AI gagal, backend mengembalikan error.
