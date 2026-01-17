const { ActivityHistory, Invoice } = require('../models');

// 1. Kreiraj novu aktivnost
const createHistoryActivity = async (req, res) => {
  try {
    const { invoice_id, sent_at, sent_method, action } = req.body;

    const activity = await ActivityHistory.create({
      invoice_id,
      sent_at,
      sent_method,
      action,
      created_at: new Date()
    });

    res.status(201).json(activity);
  } catch (err) {
    console.error('Greška kod kreiranja aktivnosti:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 2. Dohvati sve aktivnosti
const getAllHistoryActivities = async (req, res) => {
  try {
    const activities = await ActivityHistory.findAll({
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ],
      order: [['sent_at', 'DESC']]
    });

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 3. Dohvati aktivnost po ID-u
const getHistoryActivityById = async (req, res) => {
  try {
    const activity = await ActivityHistory.findByPk(req.params.id, {
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ]
    });

    if (!activity) return res.status(404).json({ message: 'Aktivnost nije pronađena' });

    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 4. Update aktivnosti
const updateHistoryActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await ActivityHistory.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ message: 'Aktivnost nije pronađena' });

    res.json({ message: 'Aktivnost ažurirana' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 5. Delete aktivnosti
const deleteHistoryActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ActivityHistory.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'Aktivnost nije pronađena' });

    res.json({ message: 'Aktivnost obrisana' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

module.exports = {
  createHistoryActivity,
  getAllHistoryActivities,
  getHistoryActivityById,
  updateHistoryActivity,
  deleteHistoryActivity,
};
