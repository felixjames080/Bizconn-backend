const prisma = require('../config/db');

exports.createEscrow = async (req, res) => {
  try {

    const {
      amount,
      buyerId,
      sellerId,
      transactionId
    } = req.body;

    const existingEscrow =
  await prisma.escrow.findUnique({
    where: {
      transactionId
    }
  });

if (existingEscrow) {
  return res.status(400).json({
    success: false,
    message:
      'Escrow already exists for this transaction'
  });
}

    const escrow =
      await prisma.escrow.create({
        data: {
          amount,
          buyerId,
          sellerId,
          transactionId
        }
      });

    return res.json({
      success: true,
      escrow
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};