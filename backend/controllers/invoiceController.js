const db = require('../models');
const { Invoice, Patient, User, Payment, ActivityHistory, Document, Delivery  } = db;

// Funkcija za automatsko generiranje broja računa
const generateInvoiceNumber = async () => {
  const year = new Date().getFullYear();

  const lastInvoice = await Invoice.findOne({
    where: db.sequelize.where(
      db.sequelize.fn('YEAR', db.sequelize.col('issue_date')),
      year
    ),
    order: [['invoice_id', 'DESC']]
  });

  let nextNumber = 1;

  if (lastInvoice) {
    const lastNum = lastInvoice.invoice_number.split('-')[2];
    nextNumber = parseInt(lastNum, 10) + 1;
  }

  return `INV-${year}-${String(nextNumber).padStart(4, '0')}`;
};


const createInvoice = async (req, res) => {
  console.log('➡️ CREATE INVOICE HIT', req.body);
  try {
    const {
      patient_id,
      amount_due,
      issue_date,
      due_date,
      payment_status,
      reminder_sent,
      created_by
    } = req.body;

    const invoice_number =
      req.body.invoice_number || await generateInvoiceNumber();

    const invoice = await Invoice.create({
      patient_id,
      invoice_number,
      amount_due,
      issue_date,
      due_date,
      payment_status,
      reminder_sent: reminder_sent ?? false,
      created_by,
      created_at: new Date()
    });

    res.status(201).json(invoice);
  } catch (err) {
    console.error('Greška kod kreiranja invoice:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};



// 2. Dohvati sve fakture
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: Patient, as: 'Patient', attributes: ['patient_id', 'first_name', 'last_name'] },
        { model: User, as: 'CreatedBy', attributes: ['user_id', 'first_name', 'last_name'] },
        { model: Delivery, as: 'Delivery' }
      ],
      order: [['issue_date', 'DESC']]
    });
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 3. Dohvati fakturu po ID-u
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.invoice_id, {
      include: [
        { model: Patient, as: 'Patient', attributes: ['patient_id', 'first_name', 'last_name'] },
        { model: User, as: 'CreatedBy', attributes: ['user_id', 'first_name', 'last_name'] },
        { model: Payment, as: 'Payments' },
        { model: ActivityHistory, as: 'Activities' },
        { model: Document, as: 'Documents' },
        { model: Delivery, as: 'Delivery' }
      ]
    });

    if (!invoice) return res.status(404).json({ message: 'Invoice nije pronađen' });

    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 4. Update fakture (npr. payment_status ili reminder_sent)
const updateInvoice = async (req, res) => {
  try {
    const invoice_id = req.params.invoice_id;
    const [updated] = await Invoice.update(req.body, { where: { invoice_id } });

    if (!updated) return res.status(404).json({ message: 'Invoice nije pronađen' });

    res.json({ message: 'Invoice ažuriran' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 5. Delete fakture
const deleteInvoice = async (req, res) => {
  try {
    const invoice_id = req.params.invoice_id;
    const deleted = await Invoice.destroy({ where: { invoice_id } });

    if (!deleted) return res.status(404).json({ message: 'Invoice nije pronađen' });

    res.json({ message: 'Invoice obrisan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
};
