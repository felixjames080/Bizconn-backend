const prisma = require('../config/db');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: req.user.userId
      }
    });

    return res.json(wallet);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    const wallet = await prisma.wallet.update({
      where: {
        userId: req.user.userId
      },
      data: {
        balance: {
          increment: Number(amount)
        }
      }
    });

    return res.json(wallet);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};