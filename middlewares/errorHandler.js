function errorHttp(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function notFoundHandler(req, res) {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null,
  });
}

function errorHandler(error, req, res, next) {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'error',
      message: 'Format JSON tidak valid',
      data: null,
    });
  }

  const status = error.status || 500;

  if (status === 500) {
    console.error(error.stack);
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      data: null,
    });
  }

  res.status(status).json({
    status: 'error',
    message: error.message,
    data: null,
  });
}

module.exports = {
  errorHttp,
  notFoundHandler,
  errorHandler,
};
