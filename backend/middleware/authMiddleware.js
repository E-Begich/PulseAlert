const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Nema tokena, pristup odbijen' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info iz tokena
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Neispravan token' });
  }
};

module.exports = authMiddleware;
