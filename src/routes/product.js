const
    express = require("express"),
    {check} = require("express-validator"),
    router = express.Router();
    productCtrl= require('../controllers/product')





router.post('/addProduct/:id',productCtrl.addProduct);
router.get('/getAllProducts',productCtrl.getAllProducts);
router.get('/getProductById/:id',productCtrl.getProductById);
router.put('/updateProductById/:id',productCtrl.updateProductById);
router.delete('/deleteProductById/:id',productCtrl.deleteProductById);




module.exports = router;