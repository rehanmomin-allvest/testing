// controllers/hospital/hospitalController.js
const hospitalService = require('../../services/hospitalService');

// GET all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.status(200).json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// GET hospital by ID
exports.getHospitalById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("nawa message hai")
  try {g
    const hospital = await hospitalService.getHospitalById(id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json(hospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// CREATE hospital
exports.createHospital = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name) return res.status(400).json({ message: 'Hospital name is required' });

    const hospital = await hospitalService.createHospital(data);
    res.status(201).json(hospital);
  } catch (err) {
    if (err.message === 'Hospital name already exists') {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// DELETE hospital
exports.deleteHospital = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Hi welcome');
  try {
    const hospital = await hospitalService.deleteHospital(id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json({ message: 'Hospital deleted successfully', hospital });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
