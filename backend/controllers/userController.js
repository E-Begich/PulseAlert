const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREATE user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: "Korisnik uspješno kreiran",
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
      attributes: { exclude: ["password"] },
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
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
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
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    await user.update(req.body);
    res.json({ message: "Korisnik uspješno ažuriran" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    await user.destroy();
    res.json({ message: "Korisnik obrisan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////////////////////////
// 🔐 LOGIN
////////////////////////////////////////////////////
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Korisnik ne postoji" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Pogrešna lozinka" });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Greška na serveru" });
  }
};
