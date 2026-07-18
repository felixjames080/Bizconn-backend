
console.log('transactionRoutes.js loaded');
const router = require('express').Router();

const transactionController =
require('../controllers/transactionController');

const authMiddleware =
require('../middleware/authMiddleware');

router.get('/test', (req, res) => {
  res.json({ message: 'Transaction route works' });
});


router.post(
  '/create',
  authMiddleware,
  transactionController.createTransaction
);
router.post(
  '/:id/complete',
  authMiddleware,
  transactionController.completeTransaction
);

router.post(
  '/:id/dispute',
  authMiddleware,
  transactionController.raiseDispute
);

router.get(
  '/my',
  authMiddleware,
  transactionController.getMyTransactions
);

router.get(
  '/:id/dispute',
  authMiddleware,
  transactionController.getDispute
);

module.exports = router;