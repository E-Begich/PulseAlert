const { Document, Invoice } = require('../models');

// 1. Kreiraj novi dokument
const createDocument = async (req, res) => {
  try {
    const { invoice_id, file_path, file_type } = req.body;

    const document = await Document.create({
      invoice_id,
      file_path,
      file_type,
      upload_time: new Date()
    });

    res.status(201).json(document);
  } catch (err) {
    console.error('Greška kod kreiranja dokumenta:', err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 2. Dohvati sve dokumente
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ],
      order: [['upload_time', 'DESC']]
    });

    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 3. Dohvati dokument po ID-u
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.document_id, {
      include: [
        { model: Invoice, as: 'Invoice', attributes: ['invoice_id', 'invoice_number'] }
      ]
    });

    if (!document) return res.status(404).json({ message: 'Dokument nije pronađen' });

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 4. Update dokumenta
const updateDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Document.update(req.body, { where: { document_id: id } });

    if (!updated) return res.status(404).json({ message: 'Dokument nije pronađen' });

    res.json({ message: 'Dokument ažuriran' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

// 5. Delete dokumenta
const deleteDocument = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Document.destroy({ where: { document_id: id } });

    if (!deleted) return res.status(404).json({ message: 'Dokument nije pronađen' });

    res.json({ message: 'Dokument obrisan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška na serveru' });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};
