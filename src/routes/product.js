const
    express = require("express"),
    {check} = require("express-validator"),
    router = express.Router();
    productCtrl= require('../controllers/product')





router.post('/:id',productCtrl.addProduct);
router.get('/',productCtrl.getAllProducts);
router.get('/:id',productCtrl.getProductById);
router.put('/:id',productCtrl.updateProductById);
router.delete('/:id',productCtrl.deleteProductById);




module.exports = router;