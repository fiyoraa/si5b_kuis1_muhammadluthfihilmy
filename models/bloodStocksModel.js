let bloodStocks = [
  {
    id: 1,
    golonganDarah: 'O',
    rhesus: '+',
    jumlahKantong: 42,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-28',
  },
  {
    id: 2,
    golonganDarah: 'A',
    rhesus: '+',
    jumlahKantong: 28,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-28',
  },
  {
    id: 3,
    golonganDarah: 'B',
    rhesus: '-',
    jumlahKantong: 12,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-27',
  },
  {
    id: 4,
    golonganDarah: 'AB',
    rhesus: '+',
    jumlahKantong: 16,
    lokasi: 'UDD PMI Kabupaten Banyuasin',
    tanggalUpdate: '2026-09-26',
  },
  {
    id: 5,
    golonganDarah: 'O',
    rhesus: '-',
    jumlahKantong: 9,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-25',
  },
  {
    id: 6,
    golonganDarah: 'A',
    rhesus: '-',
    jumlahKantong: 21,
    lokasi: 'UDD PMI Kabupaten Ogan Ilir',
    tanggalUpdate: '2026-09-24',
  },
  {
    id: 7,
    golonganDarah: 'B',
    rhesus: '+',
    jumlahKantong: 34,
    lokasi: 'UDD PMI Kota Prabumulih',
    tanggalUpdate: '2026-09-23',
  },
  {
    id: 8,
    golonganDarah: 'AB',
    rhesus: '-',
    jumlahKantong: 7,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-22',
  },
  {
    id: 9,
    golonganDarah: 'O',
    rhesus: '+',
    jumlahKantong: 38,
    lokasi: 'UDD PMI Kabupaten Musi Banyuasin',
    tanggalUpdate: '2026-09-21',
  },
  {
    id: 10,
    golonganDarah: 'A',
    rhesus: '+',
    jumlahKantong: 25,
    lokasi: 'UDD PMI Kota Lubuklinggau',
    tanggalUpdate: '2026-09-20',
  },
  {
    id: 11,
    golonganDarah: 'B',
    rhesus: '-',
    jumlahKantong: 14,
    lokasi: 'UDD PMI Kabupaten Muara Enim',
    tanggalUpdate: '2026-09-19',
  },
  {
    id: 12,
    golonganDarah: 'O',
    rhesus: '-',
    jumlahKantong: 19,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-18',
  },
  {
    id: 13,
    golonganDarah: 'AB',
    rhesus: '+',
    jumlahKantong: 11,
    lokasi: 'UDD PMI Kabupaten Ogan Komering Ilir',
    tanggalUpdate: '2026-09-17',
  },
  {
    id: 14,
    golonganDarah: 'A',
    rhesus: '-',
    jumlahKantong: 18,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-16',
  },
  {
    id: 15,
    golonganDarah: 'B',
    rhesus: '+',
    jumlahKantong: 30,
    lokasi: 'UDD PMI Kabupaten Banyuasin',
    tanggalUpdate: '2026-09-15',
  },
  {
    id: 16,
    golonganDarah: 'O',
    rhesus: '+',
    jumlahKantong: 47,
    lokasi: 'UDD PMI Kota Palembang',
    tanggalUpdate: '2026-09-14',
  },
  {
    id: 17,
    golonganDarah: 'A',
    rhesus: '+',
    jumlahKantong: 23,
    lokasi: 'UDD PMI Kabupaten Lahat',
    tanggalUpdate: '2026-09-13',
  },
  {
    id: 18,
    golonganDarah: 'B',
    rhesus: '-',
    jumlahKantong: 10,
    lokasi: 'UDD PMI Kota Pagar Alam',
    tanggalUpdate: '2026-09-12',
  },
];

let nextId = 19;

function getAll(golonganDarah) {
  if (golonganDarah) {
    return bloodStocks.filter((stock) => stock.golonganDarah === golonganDarah);
  }

  return bloodStocks;
}

function getById(id) {
  return bloodStocks.find((stock) => stock.id === id);
}

function create(data) {
  const newStock = { id: nextId++, ...data };
  bloodStocks.push(newStock);
  return newStock;
}

function update(id, data) {
  const index = bloodStocks.findIndex((stock) => stock.id === id);
  if (index === -1) return null;

  const updatedStock = { id, ...data };
  bloodStocks[index] = updatedStock;
  return updatedStock;
}

function remove(id) {
  const index = bloodStocks.findIndex((stock) => stock.id === id);
  if (index === -1) return false;

  bloodStocks.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
