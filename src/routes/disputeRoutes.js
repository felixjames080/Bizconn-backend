console.log('disputeRoutes.js loaded');

const router = require('express').Router();

const disputeController =
  require('../controllers/disputeController');

const authMiddleware =
  require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  disputeController.getAllDisputes
);

router.get('/test', (req, res) => {
  res.json({
    message: 'Dispute route works'
  });
});

router.post(
  '/:id/refund',
  authMiddleware,
  disputeController.refundBuyer
);

router.post(
  '/:id/release',
  authMiddleware,
  disputeController.releaseSeller
);

module.exports = router;