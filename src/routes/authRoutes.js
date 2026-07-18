const router = require('express').Router();

const authController =
require('../controllers/authController');

const authMiddleware =
require('../middleware/authMiddleware');

const verifiedMiddleware =
require('../middleware/verifiedMiddleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post(
  '/kyc',
  authMiddleware,
  authController.submitKYC
);

// router.post(
//   '/chat/start',
//   authMiddleware,
//   verifiedMiddleware,
//   chatController.startChat
// );

// router.post(
//   '/transactions/create',
//   authMiddleware,
//   verifiedMiddleware,
//   transactionController.createTransaction
// );


module.exports = router;