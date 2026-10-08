# kuis 1 refactor restful api

- nama: muhammad luthfi hilmy
- npm: 2428240032
- kelas: si5b
- topik tugas 1: pmi - stok darah
- entitas utama: blood-stocks

## jalanin project

```bash
npm install
npm run dev
```

nanti server berjalan di `http://localhost:3000`.

## environment

salin `.env.example` jadi `.env`, terus isi nilai api key:

```env
PORT=3000
API_KEY=isi-dgn-api-key-klian
CORS_ORIGIN=*
```

file `.env` hanya digunakan secara lokal dan tidak boleh diupload ke repository.

## endpoint

| method | endpoint | api key | status sukses |
| --- | --- | --- | --- |
| get | `/blood-stocks` | tidak | 200 |
| get | `/blood-stocks/:id` | tidak | 200 |
| post | `/blood-stocks` | ya | 201 |
| put | `/blood-stocks/:id` | ya | 200 |
| delete | `/blood-stocks/:id` | ya | 204 |

filter data:

```text
GET /blood-stocks?golonganDarah=O
```

## header request

post, put, dan delete memerlukan header:

```text
x-api-key: nilai-API_KEY-dari-.env
Content-Type: application/json
```

## body post dan put

```json
{
  "golonganDarah": "AB",
  "rhesus": "+",
  "jumlahKantong": 20,
  "lokasi": "Muhammad Luthfi Hilmy 2428240032",
  "tanggalUpdate": "2026-10-08"
}
```

## struktur project

```text
kuis/
├── app.js
├── controllers/
│   └── bloodStocksController.js
├── middlewares/
│   ├── cekApiKey.js
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   └── bloodStocksModel.js
└── routes/
    └── bloodStocksRoutes.js
```

- `models` menyimpan data dan fungsi pengolahannya tanpa `req` atau `res`.
- `controllers` menangani request, validasi, dan response.
- `routes` memetakan url ke controller.
- `middlewares` menangani logger, api key, 404, dan error terpusat.
- `app.js` menggabungkan seluruh komponen aplikasi.

## pengujian

1. get seluruh data - `200 ok`
2. get data berdasarkan id - `200 ok`
3. post dengan api key dan body lengkap - `201 created`
4. put dengan api key dan body lengkap - `200 ok`
5. delete dengan api key - `204 no content`
6. post tanpa api key - `401 unauthorized`
7. post dengan body tidak lengkap - `400 bad request`
8. post dengan json rusak - `400 bad request`
9. get id yang tidak ditemukan - `404 not found`
