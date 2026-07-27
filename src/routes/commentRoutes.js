const router = require('express').Router();

const commentController =
require('../controllers/commentController');

const authMiddleware =
require('../middleware/authMiddleware');

router.get('/test', (req, res) => {
  res.json({
    message: 'Comment routes working'
  });
});

router.post(
  '/post/:postId',
  authMiddleware,
  commentController.createPostComment
);

router.post(
  '/reel/:reelId',
  authMiddleware,
  commentController.createReelComment
);

router.get(
  '/post/:postId',
  commentController.getPostComments
);

router.get(
  '/reel/:reelId',
  commentController.getReelComments
);

router.delete(
  '/:id',
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;