const { User } = require('../models');

// CREATE user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: 'Korisnik uspješno kreiran',
      user_id: user.user_id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }, // nikad ne vraćamo lozinku
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    await user.update(req.body);
    res.json({ message: 'Korisnik uspješno ažuriran' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    await user.destroy();
    res.json({ message: 'Korisnik obrisan' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
