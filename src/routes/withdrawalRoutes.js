const router = require('express').Router();

const withdrawalController =
  require('../controllers/withdrawalController');

const authMiddleware =
  require('../middleware/authMiddleware');

router.post(
  '/request',
  authMiddleware,
  withdrawalController.requestWithdrawal
);

router.get(
  '/my',
  authMiddleware,
  withdrawalController.getMyWithdrawals
);

module.exports = router;
console.log(
  typeof withdrawalController.requestWithdrawal
);

console.log(
  typeof withdrawalController.getMyWithdrawals
);