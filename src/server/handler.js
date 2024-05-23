const crypto = require('crypto');
const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const {
    confidenceScore,
    label,
    explanation,
    suggestion,
  } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    label,
    confidenceScore,
    explanation,
    suggestion,
    createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data,
  });
  response.code(201);
  return response;
};

module.exports = postPredictHandler;
