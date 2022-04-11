const
    express = require("express"),
    userCtrl = require("../controllers/user"),
    {check} = require("express-validator"),
    router = express.Router();

router.post('/signup',[
    check("name","Name atleast should be 3 character").isLength({min: 3}),
    check("phoneNumber","Phone number atleast should be 8 character and a number").isNumeric().isLength({min: 8, max:8}),
    check("password","Password atleast should be 6 character").isLength({min: 6})

] ,userCtrl.signup)

router.post('/signin',userCtrl.signin);

router.get('/signout',userCtrl.signout);

router.get('/',userCtrl.getAllUsers);

router.get('/:id',userCtrl.getUserById);

router.delete('/:id',userCtrl.deleteUserById);

router.put('/:id',userCtrl.updateUserById);

router.post('/addloyaltycard/:id', userCtrl.addLoyaltyCard);


module.exports = router;