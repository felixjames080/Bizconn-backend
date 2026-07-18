const prisma = require('../config/db');

module.exports = async (
  req,
  res,
  next
) => {
  try {

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user.userId
        }
      });

    if (
      user.verificationStatus !== 'VERIFIED'
    ) {
      return res.status(403).json({
        message:
          'Identity verification required'
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};