const hospitalQueries = require('../queries/hospitalQueries');

async function getAllHospitals() {
  return hospitalQueries.getAllHospitals();
}

async function getHospitalById(id) {
  return hospitalQueries.getHospitalById(id);
}

async function createHospital(data) {
  return hospitalQueries.createHospital(data);
}

async function deleteHospital(id) {
  return hospitalQueries.deleteHospital(id);
}

module.exports = {
  getAllHospitals,
  getHospitalById,
  createHospital,
  deleteHospital,
};

