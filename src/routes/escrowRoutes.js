const router = require('express').Router();

const escrowController =
require('../controllers/escrowController');

const authMiddleware =
require('../middleware/authMiddleware');

const verifiedMiddleware =
require('../middleware/verifiedMiddleware');

router.post(
  '/create',
  authMiddleware,
  verifiedMiddleware,
  escrowController.createEscrow
);

module.exports = router;