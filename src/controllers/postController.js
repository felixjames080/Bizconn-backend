const prisma = require('../config/db');
exports.createPost = async (req, res) => {
  try {
    const { content, mediaUrl } = req.body;

    console.log('Authenticated User:', req.user);

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      }
    });

    console.log('Database User:', user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const post = await prisma.post.create({
      data: {
        content,
        mediaUrl,
        userId: req.user.userId
      }
    });

    return res.status(201).json({
      success: true,
      post
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: error.message
    });
  }
};
exports.getFeed = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
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

    return res.json(posts);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id
      }
    });

    return res.json(post);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.deletePost = async (req, res) => {
  try {

    await prisma.post.delete({
      where: {
        id: req.params.id
      }
    });

    return res.json({
      success: true,
      message: 'Post deleted'
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};