const { Patient, Invoice } = require('../models');

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
    const patients = await Patient.findAll({
      include: [
        {
          model: Invoice,
          as: 'Invoices', // <-- mora se točno poklapati s aliasom u modelu
          required: false, // vrati sve pacijente, čak i ako nemaju invoice
        }
      ]
    });

    // Dodaj flag hasInvoice za frontend
    const data = patients.map(p => ({
      ...p.toJSON(),
      hasInvoice: p.Invoices && p.Invoices.length > 0
    }));

    res.json(data);
  } catch (error) {
    console.error(error);
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
// DELETE pacijent
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patient_id, {
      include: [
        { model: Invoice, as: 'Invoices' } // uključujemo invoice
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Pacijent nije pronađen' });
    }

    if (patient.Invoices && patient.Invoices.length > 0) {
      return res.status(400).json({ message: 'Pacijent ima račun i ne može biti obrisan' });
    }

    await patient.destroy();
    res.json({ message: 'Pacijent obrisan' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Greška prilikom brisanja pacijenta' });
  }
};


