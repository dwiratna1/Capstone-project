# ModalIn Express API Contract

Base URL lokal:

```text
http://localhost:5000/api
```

Semua response memakai envelope standar:

```json
{
  "status": "success",
  "message": "Message",
  "data": {}
}
```

Error memakai envelope:

```json
{
  "status": "error",
  "message": "Error message"
}
```

Route protected wajib memakai header:

```http
Authorization: Bearer <token>
```

## Health

### GET /health

Public health check.

Response `200`:

```json
{
  "status": "success",
  "message": "ModalIn backend is running"
}
```

## Auth

### POST /auth/register

Register user baru. Email disimpan lowercase dan password disimpan sebagai bcrypt hash.

Request:

```json
{
  "name": "Dwi Ratna",
  "email": "dwi@example.com",
  "password": "password123",
  "phone": "+628123456789"
}
```

Response `201`:

```json
{
  "status": "success",
  "message": "Register success",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "Dwi Ratna",
      "email": "dwi@example.com",
      "phone": "+628123456789",
      "createdAt": "2026-05-18T00:00:00.000Z",
      "updatedAt": "2026-05-18T00:00:00.000Z"
    }
  }
}
```

Validation:

- `name`, `email`, `password` wajib.
- `password` minimal 8 karakter.
- Duplicate email mengembalikan `409`.

### POST /auth/login

Login dengan email dan password.

Request:

```json
{
  "email": "dwi@example.com",
  "password": "password123"
}
```

Response `200`:

```json
{
  "status": "success",
  "message": "Login success",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "Dwi Ratna",
      "email": "dwi@example.com",
      "phone": "+628123456789"
    }
  }
}
```

Email/password salah mengembalikan `401` dengan message umum `Invalid email or password`.

### GET /auth/me

Protected. Mengambil user terbaru dari token.

Response `200`:

```json
{
  "status": "success",
  "message": "Current user fetched successfully",
  "data": {
    "id": "user-id",
    "name": "Dwi Ratna",
    "email": "dwi@example.com",
    "phone": "+628123456789"
  }
}
```

## Onboarding

### POST /onboarding/business

Protected. Menyimpan atau update profil usaha dan platform dummy. Submit ulang memakai upsert sehingga tidak membuat duplicate profile/platform.

Request:

```json
{
  "businessName": "Warung Makan Bu Sari",
  "ownerName": "Dwi Ratna",
  "businessType": "Kuliner / F&B",
  "businessAge": "ONE_TO_TWO_YEARS",
  "address": "Jl. Nusantara No. 14",
  "description": "Warung makan rumahan",
  "platforms": ["Shopee", "Tokopedia", "Gojek"]
}
```

Response `200`:

```json
{
  "status": "success",
  "message": "Business onboarding saved successfully",
  "data": {
    "businessProfile": {},
    "platforms": []
  }
}
```

Allowed `businessAge`:

- `LESS_THAN_1_YEAR`
- `ONE_TO_TWO_YEARS`
- `THREE_TO_FIVE_YEARS`
- `MORE_THAN_5_YEARS`

Platform label umum seperti `Shopee`, `Tokopedia`, `Gojek`, `GoPay`, `OVO`, `DANA`, `Bank`, dan `Offline / Toko fisik` akan dimapping ke enum Prisma.

### POST /onboarding/financial

Protected. Menyimpan atau update profil keuangan. Nominal boleh number atau string rupiah sederhana seperti `"8.000.000"`.

Request:

```json
{
  "monthlyRevenue": "8.000.000",
  "monthlyExpense": "5.500.000",
  "estimatedAssets": "15.000.000",
  "declaredDebt": "0",
  "transactionRange": "50-200 transaksi"
}
```

Response `200`:

```json
{
  "status": "success",
  "message": "Financial onboarding saved successfully",
  "data": {
    "financialProfile": {}
  }
}
```

Allowed `transactionRange`:

- `LESS_THAN_10`
- `TEN_TO_FIFTY`
- `FIFTY_TO_TWO_HUNDRED`
- `TWO_HUNDRED_TO_FIVE_HUNDRED`
- `MORE_THAN_FIVE_HUNDRED`

`declaredDebt` default ke `0` jika kosong.

## Scores

Semua score endpoint protected.

### POST /scores/calculate

Menghitung skor baru melalui FastAPI AI service. Backend membuat row `CreditScore` status `PENDING`, memanggil AI, lalu update menjadi `COMPLETED` atau `FAILED`.

Response `201` jika AI sukses:

```json
{
  "status": "success",
  "message": "Score calculated successfully",
  "data": {
    "score": {
      "id": "score-id",
      "score": 748,
      "category": "Cukup Baik",
      "status": "COMPLETED",
      "modelVersion": "modalin-v1",
      "calculatedAt": "2026-05-18T00:00:00.000Z",
      "breakdown": {
        "character": 75,
        "capacity": 80,
        "condition": 68,
        "capital": 55,
        "collateral": 45
      },
      "factors": [],
      "recommendations": []
    }
  }
}
```

Error behavior:

- Onboarding business/financial belum lengkap: `400`.
- AI service mati atau timeout: `503`.
- AI response tidak sesuai kontrak: `502`.
- Jika gagal setelah row dibuat, `CreditScore` disimpan dengan status `FAILED` dan `failedReason`.

### GET /scores/current

Mengambil skor `COMPLETED` terbaru.

Response `200`:

```json
{
  "status": "success",
  "message": "Current score fetched successfully",
  "data": {
    "score": {}
  }
}
```

Belum ada skor selesai mengembalikan `404`.

### GET /scores/history

Mengambil maksimal 20 skor `COMPLETED`, terbaru dulu.

Response `200`:

```json
{
  "status": "success",
  "message": "Score history fetched successfully",
  "data": {
    "scores": []
  }
}
```

### GET /scores/explainability

Mengambil skor terbaru beserta breakdown, factors, dan recommendations.

Response `200`:

```json
{
  "status": "success",
  "message": "Score explainability fetched successfully",
  "data": {
    "score": {}
  }
}
```

## Dashboard

Semua dashboard endpoint protected.

### GET /dashboard

Mengambil gabungan data untuk halaman dashboard.

Response `200`:

```json
{
  "status": "success",
  "message": "Dashboard fetched successfully",
  "data": {
    "user": {},
    "businessProfile": {},
    "financialProfile": {},
    "summary": {
      "currentScore": 748,
      "scoreCategory": "Cukup Baik",
      "scoreUpdatedAt": "2026-05-18T00:00:00.000Z",
      "monthlyRevenue": 8000000,
      "monthlyExpense": 5500000,
      "expenseRatio": 68.75,
      "declaredDebt": 0,
      "debtToRevenueRatio": 0,
      "connectedPlatformCount": 3,
      "completedScoreCount": 1
    },
    "latestScore": {},
    "breakdown": {},
    "scoreTrend": [],
    "recommendations": [],
    "activities": [],
    "completion": {
      "hasBusinessProfile": true,
      "hasFinancialProfile": true,
      "hasConnectedPlatform": true,
      "hasCompletedScore": true,
      "percentage": 100
    }
  }
}
```

Jika belum onboarding atau belum scoring, endpoint tetap `200` dengan profile/score `null`, array kosong, dan angka default `0`.

### GET /dashboard/summary

Subset untuk summary dashboard.

Response data:

```json
{
  "summary": {},
  "completion": {},
  "latestScore": {},
  "breakdown": {}
}
```

### GET /dashboard/activities

Mengembalikan aktivitas sintetis dari data DB.

Response data:

```json
{
  "activities": []
}
```

### GET /dashboard/recommendations

Mengembalikan rekomendasi dari latest completed score, urut `HIGH`, `MEDIUM`, lalu `LOW`.

Response data:

```json
{
  "recommendations": []
}
```

## Profile

Semua profile endpoint protected.

### GET /profile

Mengambil profil gabungan user.

Response `200`:

```json
{
  "status": "success",
  "message": "Profile fetched successfully",
  "data": {
    "user": {},
    "businessProfile": {},
    "financialProfile": {},
    "platforms": [],
    "completion": {}
  }
}
```

Jika user belum onboarding, `businessProfile` dan `financialProfile` bernilai `null`, `platforms` array kosong.

### PUT /profile

Update user profile dasar. Email belum bisa diubah di endpoint ini.

Request:

```json
{
  "name": "Dwi Ratna",
  "phone": "+628123456789"
}
```

Response `200`:

```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "user": {},
    "businessProfile": {},
    "financialProfile": {},
    "platforms": [],
    "completion": {}
  }
}
```

### PUT /profile/business

Update profil usaha. Payload sama dengan `POST /onboarding/business`.

Response `200`:

```json
{
  "status": "success",
  "message": "Business profile updated successfully",
  "data": {
    "user": {},
    "businessProfile": {},
    "financialProfile": {},
    "platforms": [],
    "completion": {}
  }
}
```

### PUT /profile/financial

Update profil keuangan. Payload sama dengan `POST /onboarding/financial`.

Response `200`:

```json
{
  "status": "success",
  "message": "Financial profile updated successfully",
  "data": {
    "user": {},
    "businessProfile": {},
    "financialProfile": {},
    "platforms": [],
    "completion": {}
  }
}
```

## Common Errors

### Missing token

```json
{
  "status": "error",
  "message": "Authentication token is required"
}
```

### Invalid or expired token

```json
{
  "status": "error",
  "message": "Invalid or expired authentication token"
}
```

### Not found route

```json
{
  "status": "error",
  "message": "Route /api/unknown not found"
}
```
