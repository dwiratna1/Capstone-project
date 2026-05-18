# ModalIn FastAPI AI Service Contract

Express backend memanggil FastAPI AI service saat frontend menjalankan:

```http
POST /api/scores/calculate
```

Backend akan mengambil data user dari PostgreSQL, membuat `inputSnapshot`, membuat row `CreditScore` status `PENDING`, lalu mengirim request ke:

```http
POST ${AI_SERVICE_URL}/predict
```

Default lokal:

```text
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_TIMEOUT_MS=15000
```

## Request Dari Express ke FastAPI

Content type:

```http
Content-Type: application/json
```

Payload:

```json
{
  "user": {
    "id": "user-id",
    "name": "Dwi Ratna"
  },
  "businessProfile": {
    "id": "business-profile-id",
    "businessName": "Warung Makan Bu Sari",
    "ownerName": "Dwi Ratna",
    "businessType": "Kuliner / F&B",
    "businessAge": "ONE_TO_TWO_YEARS",
    "address": "Jl. Nusantara No. 14",
    "description": "Warung makan rumahan"
  },
  "financialProfile": {
    "id": "financial-profile-id",
    "monthlyRevenue": 8000000,
    "monthlyExpense": 5500000,
    "estimatedAssets": 15000000,
    "declaredDebt": 0,
    "transactionRange": "FIFTY_TO_TWO_HUNDRED"
  },
  "platforms": [
    {
      "id": "platform-id",
      "provider": "SHOPEE",
      "category": "MARKETPLACE",
      "status": "CONNECTED",
      "accountName": null,
      "accountUrl": null,
      "rating": null,
      "metadata": null,
      "connectedAt": "2026-05-18T00:00:00.000Z"
    }
  ]
}
```

Catatan:

- `businessProfile` dan `financialProfile` dipastikan ada sebelum Express memanggil AI.
- Nominal uang dikirim sebagai number hasil serialisasi Decimal.
- Platform masih data simulasi, bukan hasil OAuth asli.
- Payload ini juga disimpan di `CreditScore.inputSnapshot` untuk audit.

## Response Yang Diharapkan Express

FastAPI wajib mengembalikan JSON:

```json
{
  "score": 748,
  "category": "Cukup Baik",
  "modelVersion": "modalin-v1",
  "breakdown": {
    "character": 75,
    "capacity": 80,
    "condition": 68,
    "capital": 55,
    "collateral": 45
  },
  "factors": [
    {
      "dimension": "CAPACITY",
      "impactType": "POSITIVE",
      "title": "Omzet stabil",
      "description": "Tren omzet meningkat",
      "impactPoints": 65,
      "weight": 12.5
    }
  ],
  "recommendations": [
    {
      "title": "Hubungkan e-wallet",
      "description": "Verifikasi arus kas digital",
      "dimension": "CAPACITY",
      "priority": "HIGH",
      "estimatedPoints": 18,
      "actionLabel": "Hubungkan",
      "metadata": {
        "source": "model"
      }
    }
  ]
}
```

## Field Rules

### Root fields

- `score`: wajib, number, range `0` sampai `1000`. Express akan membulatkan ke integer.
- `category`: wajib, string.
- `modelVersion`: optional, string.
- `breakdown`: wajib, object.
- `factors`: optional array. Jika tidak ada, Express menyimpan array kosong.
- `recommendations`: optional array. Jika tidak ada, Express menyimpan array kosong.

### Breakdown

Semua field wajib number range `0` sampai `100`:

- `character`
- `capacity`
- `condition`
- `capital`
- `collateral`

### Factors

Setiap item `factors`:

- `dimension`: wajib, salah satu `CHARACTER`, `CAPACITY`, `CONDITION`, `CAPITAL`, `COLLATERAL`
- `impactType`: wajib, salah satu `POSITIVE`, `NEGATIVE`
- `title`: wajib, string
- `description`: optional string
- `impactPoints`: optional number, default `0` jika kosong
- `weight`: optional number

### Recommendations

Setiap item `recommendations`:

- `title`: wajib, string
- `description`: optional string
- `dimension`: optional, salah satu `CHARACTER`, `CAPACITY`, `CONDITION`, `CAPITAL`, `COLLATERAL`
- `priority`: optional, salah satu `LOW`, `MEDIUM`, `HIGH`, default `MEDIUM`
- `estimatedPoints`: optional number
- `actionLabel`: optional string
- `metadata`: optional object

## Express Save Behavior

Jika AI sukses:

1. `CreditScore` diupdate menjadi `COMPLETED`.
2. `score`, `category`, `modelVersion`, `calculatedAt`, dan `rawAiResponse` disimpan.
3. `ScoreBreakdown` dibuat dari `breakdown`.
4. `ScoreFactor` dibuat dari `factors`.
5. `Recommendation` dibuat dari `recommendations`.

Jika AI gagal:

1. Row `CreditScore` yang sudah dibuat akan diupdate menjadi `FAILED`.
2. `failedReason` diisi dengan pesan error.
3. Express mengembalikan error ke frontend.

## Error Behavior

### Onboarding belum lengkap

Express tidak memanggil AI dan langsung mengembalikan `400`:

```json
{
  "status": "error",
  "message": "Business and financial onboarding must be completed before scoring"
}
```

### AI service mati atau timeout

Express mengembalikan `503`:

```json
{
  "status": "error",
  "message": "AI service is unavailable"
}
```

atau:

```json
{
  "status": "error",
  "message": "AI service request timed out"
}
```

### AI response tidak valid

Express mengembalikan `502`:

```json
{
  "status": "error",
  "message": "AI response does not match expected scoring contract"
}
```

Contoh invalid response:

- `score` tidak ada.
- `score` di luar `0..1000`.
- `breakdown` tidak ada.
- Salah satu nilai breakdown di luar `0..100`.
- `dimension`, `impactType`, atau `priority` bukan enum yang didukung.

## Minimal Mock Response Untuk Development

FastAPI/mock service cukup mengembalikan response ini agar `POST /api/scores/calculate` sukses:

```json
{
  "score": 748,
  "category": "Cukup Baik",
  "modelVersion": "modalin-mock-v1",
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
```
