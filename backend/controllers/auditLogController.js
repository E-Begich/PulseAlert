const { AuditLog, User } = require('../models');

// 1. Dodaj novi log
const addAuditLog = async ({ userId, action }) => {
  try {
    const log = await AuditLog.create({
      user_id: userId,
      action
    });
    console.log('Audit log created:', log);
    return log;
  } catch (err) {
    console.error('Greška kod logiranja audita:', err);
  }
};

// 2. Dohvati sve logove
const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      include: [
        { model: User, as: 'User', attributes: ['first_name', 'last_name'] }
      ],
      order: [['timestamp', 'DESC']]
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 3. Dohvati logove po korisniku
const getLogsByUser = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      where: { user_id: req.params.user_id },
      order: [['timestamp', 'DESC']]
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

module.exports = {
  addAuditLog,
  getAllAuditLogs,
  getLogsByUser
};
