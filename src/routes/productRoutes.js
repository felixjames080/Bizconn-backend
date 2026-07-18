const router = require('express').Router();

const productController =
require('../controllers/productController');

const authMiddleware =
require('../middleware/authMiddleware');

router.post(
  '/',
  authMiddleware,
  productController.createProduct
);

router.get('/', productController.getProducts);

router.get(
  '/seller/:sellerId',
  productController.getSellerProducts
);

router.get(
  '/:id',
  productController.getProductById
);
router.get(
  '/seller/:sellerId',
  productController.getSellerProducts
);

router.get('/:id', productController.getProductById);

// router.get(
//   '/:id/dispute',
//   authMiddleware,
//   transactionController.getDispute
// );

module.exports = router;