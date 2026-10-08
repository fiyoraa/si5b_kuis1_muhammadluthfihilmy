const bloodStocksModel = require('../models/bloodStocksModel');
const { errorHttp } = require('../middlewares/errorHandler');

const requiredFields = [
  'golonganDarah',
  'rhesus',
  'jumlahKantong',
  'lokasi',
  'tanggalUpdate',
];

function validateBloodStock(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Body request harus berupa object JSON';
  }

  for (const field of requiredFields) {
    if (
      body[field] === undefined ||
      body[field] === null ||
      (typeof body[field] === 'string' && body[field].trim() === '')
    ) {
      return `Field ${field} wajib diisi`;
    }
  }

  if (!['A', 'B', 'AB', 'O'].includes(body.golonganDarah)) {
    return 'golonganDarah harus A, B, AB, atau O';
  }

  if (!['+', '-'].includes(body.rhesus)) {
    return 'rhesus harus + atau -';
  }

  if (
    typeof body.jumlahKantong !== 'number' ||
    !Number.isFinite(body.jumlahKantong)
  ) {
    return 'jumlahKantong harus berupa number';
  }

  if (typeof body.lokasi !== 'string') {
    return 'lokasi harus berupa string';
  }

  if (
    typeof body.tanggalUpdate !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(body.tanggalUpdate)
  ) {
    return 'tanggalUpdate harus berformat YYYY-MM-DD';
  }

  return null;
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function getAll(req, res) {
  const { golonganDarah } = req.query;
  res.json(bloodStocksModel.getAll(golonganDarah));
}

function getById(req, res, next) {
  const id = parseId(req.params.id);
  const stock = id === null ? null : bloodStocksModel.getById(id);

  if (!stock) {
    return next(errorHttp(404, `Data dengan id ${req.params.id} tidak ditemukan`));
  }

  res.json(stock);
}

function create(req, res, next) {
  const validationMessage = validateBloodStock(req.body);
  if (validationMessage) {
    return next(errorHttp(400, validationMessage));
  }

  const newStock = bloodStocksModel.create({
    golonganDarah: req.body.golonganDarah,
    rhesus: req.body.rhesus,
    jumlahKantong: req.body.jumlahKantong,
    lokasi: req.body.lokasi,
    tanggalUpdate: req.body.tanggalUpdate,
  });

  res.status(201).json({
    status: 'success',
    message: 'Data stok darah berhasil ditambahkan',
    data: newStock,
  });
}

function update(req, res, next) {
  const id = parseId(req.params.id);
  const existingStock = id === null ? null : bloodStocksModel.getById(id);

  if (!existingStock) {
    return next(errorHttp(404, `Data dengan id ${req.params.id} tidak ditemukan`));
  }

  const validationMessage = validateBloodStock(req.body);
  if (validationMessage) {
    return next(errorHttp(400, validationMessage));
  }

  const updatedStock = bloodStocksModel.update(id, {
    golonganDarah: req.body.golonganDarah,
    rhesus: req.body.rhesus,
    jumlahKantong: req.body.jumlahKantong,
    lokasi: req.body.lokasi,
    tanggalUpdate: req.body.tanggalUpdate,
  });

  res.json({
    status: 'success',
    message: 'Data stok darah berhasil diubah',
    data: updatedStock,
  });
}

function remove(req, res, next) {
  const id = parseId(req.params.id);
  const existingStock = id === null ? null : bloodStocksModel.getById(id);

  if (!existingStock) {
    return next(errorHttp(404, `Data dengan id ${req.params.id} tidak ditemukan`));
  }

  bloodStocksModel.remove(id);
  res.status(204).send();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
