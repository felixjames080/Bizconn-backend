const prisma = require('../config/db');

exports.createPostComment = async (req, res) => {
  try {
    const { content, voiceUrl } = req.body;
    const { postId } = req.params;

    if (!content && !voiceUrl) {
      return res.status(400).json({
        message: 'Comment content or voice note required'
      });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        voiceUrl,
        userId: req.user.userId,
        postId
      }
    });

    return res.status(201).json({
      success: true,
      comment
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.createReelComment = async (req, res) => {
  try {
    const { content, voiceUrl } = req.body;
    const { reelId } = req.params;

    if (!content && !voiceUrl) {
      return res.status(400).json({
        message: 'Comment content or voice note required'
      });
    }

    const reel = await prisma.reel.findUnique({
      where: { id: reelId }
    });

    if (!reel) {
      return res.status(404).json({
        message: 'Reel not found'
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        voiceUrl,
        userId: req.user.userId,
        reelId
      }
    });

    return res.status(201).json({
      success: true,
      comment
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.params.postId
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(comments);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getReelComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        reelId: req.params.reelId
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(comments);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    if (comment.userId !== req.user.userId) {
      return res.status(403).json({
        message: 'Unauthorized'
      });
    }

    await prisma.comment.delete({
      where: {
        id: req.params.id
      }
    });

    return res.json({
      success: true,
      message: 'Comment deleted'
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};