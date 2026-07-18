const prisma = require('../config/db');

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      imageUrl,
      location
    } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        category,
        imageUrl,
        location,
        sellerId: req.user.userId
      }
    });

    return res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: {
          select: {
            id: true,
            fullName: true,
            trustScore: true
          }
        }
      }
    });

    return res.json(products);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {

    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        seller: {
          select: {
            id: true,
            fullName: true,
            trustScore: true
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    return res.json(product);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};

exports.getSellerProducts = async (req, res) => {
  try {

    const products = await prisma.product.findMany({
      where: {
        sellerId: req.params.sellerId
      }
    });

    return res.json(products);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};