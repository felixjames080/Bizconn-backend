const router = require('express').Router();

const walletController =
require('../controllers/walletController');

const authMiddleware =
require('../middleware/authMiddleware');

const paymentController =
  require('../controllers/paymentController');
  
router.get(
  '/',
  authMiddleware,
  walletController.getWallet
);

router.get(
  '/verify/:reference',
  authMiddleware,
  paymentController.verifyPayment
);

router.post(
  '/deposit',
  authMiddleware,
  walletController.deposit
);

module.exports = router;