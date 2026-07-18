const prisma = require('../config/db');

exports.approveKYC = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.userId
      },
      data: {
        verificationStatus: 'VERIFIED',
        role: 'VERIFIED',
        trustScore: 100
      }
    });

    return res.json({
      success: true,
      message: 'KYC approved',
      user
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.rejectKYC = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.userId
      },
      data: {
        verificationStatus: 'REJECTED'
      }
    });

    return res.json({
      success: true,
      message: 'KYC rejected',
      user
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.approveMerchant = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.userId
      },
      data: {
        role: 'MERCHANT'
      }
    });

    return res.json({
      success: true,
      message: 'Merchant approved',
      user
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};