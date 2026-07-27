const router = require('express').Router();

const adminController =
require('../controllers/adminController');

const authMiddleware =
require('../middleware/authMiddleware');

router.patch(
  '/kyc/:userId/approve',
  authMiddleware,
  adminController.approveKYC
);

router.patch(
  '/kyc/:userId/reject',
  authMiddleware,
  adminController.rejectKYC
);

router.get('/test', (req, res) => {
  res.json({
    message: 'Admin routes working'
  });
});

router.patch('/test-patch', (req, res) => {
  res.json({
    success: true,
    message: 'PATCH works'
  });
});

router.patch(
  '/merchant/:userId/approve',
  authMiddleware,
  adminController.approveMerchant
);
module.exports = router;