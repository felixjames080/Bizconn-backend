const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", req.headers.authorization);

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    // const token = authHeader.split(' ')[1];
    if (!authHeader.startsWith('Bearer ')) {
  return res.status(401).json({
    message: 'Token must use Bearer format'
  });
}

const token = authHeader.split(' ')[1];

    console.log('HEADER:', authHeader);
console.log('TOKEN:', token);
console.log('Authorization Header:', req.headers.authorization);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Invalid token',
      error: error.message
    });
  }
};
