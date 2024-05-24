const crypto = require('crypto');
const predictClassification = require('../services/inferenceService');
const { storeData, allPredictCollection } = require('../services/storeData');

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const {
    result,
    suggestion,
  } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result,
    suggestion,
    createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  });
  response.code(201);
  return response;
};

const getAllHistories = async (request, h) => {
  const histories = (await allPredictCollection.get()).docs.map((doc) => doc.data());
  const data = histories.map((item) => ({
    id: item.id,
    history: item,
  }));
  return h.response({
    status: 'success',
    data,
  }).code(200);
};

module.exports = { postPredictHandler, getAllHistories };
