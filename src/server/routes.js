const { postPredictHandler, getAllHistories } = require('./handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        // Mengizinkan data berupa gambar
        allow: 'multipart/form-data',
        maxBytes: 1000000,
        multipart: true,
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getAllHistories,
  },
];

module.exports = routes;
