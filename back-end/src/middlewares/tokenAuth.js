const jwt = require('jsonwebtoken');
const fs = require('fs');
const { User } = require('../database/models');

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const noToken = { message: 'Token not found' };
const invalidToken = { message: 'Token invalid' };

const createToken = (userData) => { 
  const jwtConfig = { algorithm: 'HS256' };
  const token = jwt.sign(userData, JWT_SECRET, jwtConfig);

  return token;
};

const verifyUser = (authorization) => {
  const userData = jwt.verify(authorization, JWT_SECRET);
  return userData;
};

const authorizationGeneral = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) { 
      return res.status(404).json(noToken);
    }
    const { email } = verifyUser(authorization);

    const user = await User.findOne({ where: { email } });   

    if (!email || !user) {
      return res.status(401).json(invalidToken);
    }

    next();
  } catch (err) {
    return res.status(401).json(invalidToken);
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const { role } = verifyUser(authorization);
    if (role !== 'administrator') { 
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    
    next();
  } catch (err) {
    return res.status(401).json(invalidToken);
  }
};

module.exports = { 
  verifyUser,
  createToken,
  authorizationGeneral,
  checkAdmin,
};