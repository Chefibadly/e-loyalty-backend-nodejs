const
    express = require("express"),
    businessCtrl = require("../controllers/business"),
    {check} = require("express-validator"),
    router = express.Router();

router.post('/signin',businessCtrl.signin);
router.post('/signup',businessCtrl.signup);
router.post('/createloyaltycardProgram',businessCtrl.createLoyaltyCardProgram);
router.post('/addProduct/:id',businessCtrl.addProduct);

module.exports = router;