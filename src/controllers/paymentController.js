const axios = require('axios');
const prisma = require('../config/db');

exports.initializePayment = async (req, res) => {
  try {
    const { amount, email } = req.body;

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    return res.json(response.data);

  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    console.log(JSON.stringify(response.data, null, 2));

    const payment = response.data.data;

    if (payment.status !== 'success') {
      return res.status(400).json({
        message: 'Payment not successful'
      });
    }

    await prisma.wallet.update({
      where: {
        userId: req.user.userId
      },
      data: {
        balance: {
          increment: payment.amount / 100
        }
      }
    });

    return res.json({
      success: true,
      payment
    });

  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message
    }); 
  }

  const existingPayment =
  await prisma.payment.findUnique({
    where: {
      reference
    }
  });

if (existingPayment) {
  return res.status(400).json({
    message: 'Payment already verified'
  });
}
await prisma.payment.create({
  data: {
    reference,
    amount: payment.amount / 100,
    status: payment.status,
    userId: req.user.userId
  }
});
};