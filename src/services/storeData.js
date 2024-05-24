const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();
const allPredictCollection = db.collection('predictions');

const storeData = async (id, data) => {
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
};

module.exports = {
  storeData,
  allPredictCollection,
};
