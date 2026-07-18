const router = require('express').Router();

const paymentController =
require('../controllers/paymentController');

const authMiddleware =
require('../middleware/authMiddleware');

router.post(
  '/initialize',
  authMiddleware,
  paymentController.initializePayment
);

router.get(
  '/verify/:reference',
  authMiddleware,
  paymentController.verifyPayment
);

router.get('/test', (req, res) => {
  res.json({
    message: 'Payment routes working'
  });
});

module.exports = router;