const { Patient } = require('../models');

// CREATE
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Pacijent nije pronađen' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Pacijent nije pronađen' });
    }

    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patient_id);
    if (!patient) {
      return res.status(404).json({ message: 'Pacijent nije pronađen' });
    }

    await patient.destroy();
    res.json({ message: 'Pacijent obrisan' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
