const { Payment, Invoice } = require('../models');

// 1. Kreiraj novu uplatu
const createPayment = async (req, res) => {
  try {
    const { invoice_id, payment_date, amount, payment_method } = req.body;

    const payment = await Payment.create({
      invoice_id,
      payment_date,
      amount,
      payment_method,
      created_at: new Date()
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error('Greška kod kreiranja uplate:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 2. Dohvati sve uplate
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number', 'amount_due'] }
      ],
      order: [['payment_date', 'DESC']]
    });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 3. Dohvati uplatu po ID-u
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.payment_id, {
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ]
    });

    if (!payment) return res.status(404).json({ message: 'Uplata nije pronađena' });

    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 4. Update uplate
const updatePayment = async (req, res) => {
  try {
    const payment_id = req.params.payment_id;
    const [updated] = await Payment.update(req.body, { where: { payment_id } });

    if (!updated) return res.status(404).json({ message: 'Uplata nije pronađena' });

    res.json({ message: 'Uplata ažurirana' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 5. Delete uplate
const deletePayment = async (req, res) => {
  try {
    const payment_id = req.params.payment_id;
    const deleted = await Payment.destroy({ where: { payment_id } });

    if (!deleted) return res.status(404).json({ message: 'Uplata nije pronađena' });

    res.json({ message: 'Uplata obrisana' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};
