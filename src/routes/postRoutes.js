const router = require('express').Router();

const postController =
require('../controllers/postController');

const authMiddleware =
require('../middleware/authMiddleware');

router.post(
  '/create',
  authMiddleware,
  postController.createPost
);

router.get(
  '/feed',
  postController.getFeed
);

router.get(
  '/:id',
  postController.getPost
);

router.delete(
  '/:id',
  authMiddleware,
  postController.deletePost
);

module.exports = router;