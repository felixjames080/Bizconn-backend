const prisma = require('../config/db');

exports.requestWithdrawal = async (req, res) => {
  try {
    const {
      amount,
      accountName,
      accountNumber,
      bankCode
    } = req.body;

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: req.user.userId
      }
    });

    if (!wallet) {
      return res.status(404).json({
        message: 'Wallet not found'
      });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({
        message: 'Insufficient balance'
      });
    }

    await prisma.wallet.update({
      where: {
        userId: req.user.userId
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    });

    const withdrawal =
      await prisma.withdrawal.create({
        data: {
          amount,
          accountName,
          accountNumber,
          bankCode,
          userId: req.user.userId
        }
      });

    return res.status(201).json({
      success: true,
      withdrawal
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getMyWithdrawals = async (req, res) => {
  try {
    const withdrawals =
      await prisma.withdrawal.findMany({
        where: {
          userId: req.user.userId
        }
      });

    return res.json(withdrawals);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
