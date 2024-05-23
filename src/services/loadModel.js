const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
  const hasil = tf.loadGraphModel(process.env.MODEL_URL);
  return hasil;
};

module.exports = loadModel;
