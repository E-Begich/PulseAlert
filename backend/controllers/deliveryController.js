const { Delivery, Invoice } = require('../models');

// 1. Kreiraj novu dostavu
const createDelivery = async (req, res) => {
  try {
    const { invoice_id, status } = req.body;

    const delivery = await Delivery.create({
      invoice_id,
      status,
      last_action: new Date()
    });

    res.status(201).json(delivery);
  } catch (err) {
    console.error('Greška kod kreiranja dostave:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 2. Dohvati sve dostave
const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll({
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ],
      order: [['last_action', 'DESC']]
    });
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 3. Dohvati jednu dostavu po ID-u
const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findByPk(req.params.delivery_id, {
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ]
    });

    if (!delivery) return res.status(404).json({ message: 'Dostava nije pronađena' });

    res.json(delivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 4. Update statusa dostave
const updateDelivery = async (req, res) => {
  try {
    const { status } = req.body;
    const delivery_id = req.params.delivery_id;

    const [updated] = await Delivery.update(
      { status, last_action: new Date() },
      { where: { delivery_id } }
    );

    if (!updated) return res.status(404).json({ message: 'Dostava nije pronađena' });

    res.json({ message: 'Status dostave ažuriran' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 5. Obriši dostavu
const deleteDelivery = async (req, res) => {
  try {
    const delivery_id = req.params.delivery_id;
    const deleted = await Delivery.destroy({ where: { delivery_id } });

    if (!deleted) return res.status(404).json({ message: 'Dostava nije pronađena' });

    res.json({ message: 'Dostava obrisana' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

module.exports = {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery
};
