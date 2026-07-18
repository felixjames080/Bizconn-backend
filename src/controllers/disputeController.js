const prisma = require('../config/db');

exports.getAllDisputes = async (req, res) => {
  try {
    const disputes = await prisma.dispute.findMany();

    return res.json(disputes);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.refundBuyer = async (req, res) => {
  try {
    const { id } = req.params;

    return res.json({
      success: true,
      message: 'Refund endpoint works',
      disputeId: id
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.releaseSeller = async (req, res) => {
  try {
    const { id } = req.params;

    return res.json({
      success: true,
      message: 'Release endpoint works',
      disputeId: id
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};