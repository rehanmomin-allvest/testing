const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Get all hospitals
exports.getAllHospitals = async () => {
  const result = await pool.query('SELECT * FROM hospital ORDER BY hospital_id');
  return result.rows;
};

// Get hospital by ID
exports.getHospitalById = async (id) => {
  const result = await pool.query('SELECT * FROM hospital WHERE hospital_id = $1', [id]);
  return result.rows[0];
};

// Create hospital (check duplicate name & id)
exports.createHospital = async (data) => {
  const { hospital_id, name, location, contact_number, established_year } = data;

  // ✅ Check duplicate name
  const nameCheck = await pool.query('SELECT * FROM hospital WHERE name = $1', [name]);
  if (nameCheck.rows.length > 0) {
    throw new Error('Hospital name already exists');
  }

  // ✅ Check duplicate id (if provided explicitly)
  if (hospital_id) {
    const idCheck = await pool.query('SELECT * FROM hospital WHERE hospital_id = $1', [hospital_id]);
    if (idCheck.rows.length > 0) {
      throw new Error('Hospital ID already exists');
    }
  }

  const result = await pool.query(
    'INSERT INTO hospital (name, location, contact_number, established_year) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, location, contact_number, established_year]
  );
  return result.rows[0];
};

// Delete hospital
exports.deleteHospital = async (id) => {
  const result = await pool.query('DELETE FROM hospital WHERE hospital_id = $1 RETURNING *', [id]);
  return result.rows[0];
};
