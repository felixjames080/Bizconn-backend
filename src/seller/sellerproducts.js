exports.getSellerProducts = async (req, res) => {

  try {

    const products =
      await prisma.product.findMany({

        where: {
          sellerId: req.params.sellerId
        }

      });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};