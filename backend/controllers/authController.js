const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //provjera emaila
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Neispravan email' });
        }
        //provjera lozinke
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Neispravna lozinka' });
        }
        // 3. JWT
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Greška na serveru' });
    }
};

module.exports = { login };
