const prisma = require('../config/db');

exports.createTransaction = async (req, res) => {
  try {
    const { productId } = req.body;

    const buyerId = req.user.userId;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    const buyerWallet = await prisma.wallet.findUnique({
      where: { userId: buyerId }
    });

    if (buyerWallet.balance < product.price) {
      return res.status(400).json({
        message: 'Insufficient wallet balance'
      });
    }

    await prisma.wallet.update({
      where: { userId: buyerId },
      data: {
        balance: {
          decrement: product.price
        }
      }
    });

    const transaction = await prisma.transaction.create({
      data: {
        amount: product.price,
        buyerId,
        sellerId: product.sellerId,
        productId
      }
    });

    const escrow = await prisma.escrow.create({
      data: {
        amount: product.price,
        buyerId,
        sellerId: product.sellerId,
        transactionId: transaction.id
      }
    });

    return res.status(201).json({
      success: true,
      transaction,
      escrow
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

    exports.getMyTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        buyerId: req.user.userId
      }
    });

    return res.json(transactions);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getDispute = async (req, res) => {
  try {
    const dispute = await prisma.dispute.findUnique({
      where: {
        transactionId: req.params.id
      }
    });

    return res.json(dispute);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.completeTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id }
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    const escrow = await prisma.escrow.findUnique({
      where: {
        transactionId: transaction.id
      }
    });

    if (!escrow) {
      return res.status(404).json({
        message: 'Escrow not found'
      });
    }

    await prisma.wallet.update({
      where: {
        userId: transaction.sellerId
      },
      data: {
        balance: {
          increment: transaction.amount
        }
      }
    });

    const updatedTransaction =
      await prisma.transaction.update({
        where: { id },
        data: {
          status: 'COMPLETED'
        }
      });

    const updatedEscrow =
      await prisma.escrow.update({
        where: {
          transactionId: transaction.id
        },
        data: {
          status: 'RELEASED'
        }
      });

    return res.json({
      success: true,
      transaction: updatedTransaction,
      escrow: updatedEscrow
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.raiseDispute = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const transaction =
      await prisma.transaction.findUnique({
        where: { id }
      });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    const existingDispute =
  await prisma.dispute.findUnique({
    where: {
      transactionId: id
    }
  });

  

if (existingDispute) {
  return res.status(400).json({
    message: 'Dispute already exists',
    dispute: existingDispute
  });
}

const dispute = await prisma.dispute.create({
    });

    await prisma.transaction.update({
      where: { id },
      data: {
        status: 'DISPUTED'
      }
    });

    await prisma.escrow.update({
      where: {
        transactionId: id
      },
      data: {
        status: 'DISPUTED'
      }
    });

    return res.status(201).json({
      success: true,
      dispute
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};