require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bloodStocksRoutes = require('./routes/bloodStocksRoutes');
const logger = require('./middlewares/logger');
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    nama: 'Muhammad Luthfi Hilmy',
    nim: '2428240032',
    kelas: 'SI5B',
    topik: 7,
    resource: 'Stok Darah PMI',
    endpoints: [
      'GET /blood-stocks',
      'GET /blood-stocks/:id',
      'POST /blood-stocks',
      'PUT /blood-stocks/:id',
      'DELETE /blood-stocks/:id',
      'GET /blood-stocks?golonganDarah=O',
    ],
  });
});

app.use('/blood-stocks', bloodStocksRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
