const loyaltyCardProgram = require("../models/loyaltyCardProgram");

const
    express = require("express"),
    {check} = require("express-validator"),
    router = express.Router();
    loyaltyCardProgramCtrl= require('../controllers/loyaltyCardProgram')



router.post('/:id',loyaltyCardProgramCtrl.createLoyaltyCardProgram);
router.get('/',loyaltyCardProgramCtrl.getAllLoyaltyCardPrograms);
router.get('/:id',loyaltyCardProgramCtrl.getLoyaltyCardProgramById);
router.put('/:id',loyaltyCardProgramCtrl.updateLoyaltyCardProgramById);
router.delete('/:id',loyaltyCardProgramCtrl.deleteLoyaltyCardProgramById);

module.exports = router;