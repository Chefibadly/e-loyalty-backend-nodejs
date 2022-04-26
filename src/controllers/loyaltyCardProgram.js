const 
    Business = require('../models/business'),
    LoyaltyCardProgram = require('../models/loyaltyCardProgram'),
    

loyaltyCardProgramtCtrl={

    getAllLoyaltyCardPrograms: async(req,res)=>{
        try {
            const loyaltyCardPrograms  = await LoyaltyCardProgram.find();
            return (!loyaltyCardPrograms.length)?res.status(200).json({message:"0 loyalty Card Programs found"})
            :res.status(200).json(loyaltyCardPrograms);
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }

    },
    createLoyaltyCardProgram: async (req,res)=>{
        const loyaltyCardProgram = new LoyaltyCardProgram({
            titre : req.body.titre,
            loyalty_program_type : req.body.loyalty_program_type,
            strategy : req.body.strategy,
            business : req.params.id});
        try {
            
            
            await loyaltyCardProgram.save(async (error,loyaltyCardProgram)=>{
                if(!error){
                    const business= req.params.id;
                    await Business.findById(business).then(async businessFound =>{

                    //console.log(businessFound)
                    //const loyaltyCardPrograms = businessFound.addLoyaltyCardProgram(loyaltyCardProgram);
                    //console.log(businessFound._id)
                    if(!businessFound) return res.status(200).json({message:" business not found"})
                    await Business.findById(businessFound._id)
                    .then(businessFound =>{
                    console.log("updated",businessFound);
                    return (!businessFound)? res.status(200).json({message:" business not found"})
                    :res.status(200).json({
                        message_1: "loyalty card program created",
                        loyaltyCardProgram
                    });
                })
            })
                   /*  res.status(201).json({
                        message: "loyalty card created",
                        loyaltyCard
                    }) */
                }else{
                    console.log(error);
                    res.status(400).json(error)
                }
            })
        }catch(err){
            console.log('inside loyalty'+error);
        }
    },

    updateLoyaltyCardProgramById: async(req,res)=>{

        try {
            await LoyaltyCardProgram.findByIdAndUpdate(req.params.id,
                {titre: req.body.titre, loyalty_program_type: req.body.loyalty_program_type, strategy: req.body.strategy})
            .then(loyaltyCardProgramFound =>{
                return (!loyaltyCardProgramFound)? res.status(200).json({message:" loyalty Card Program not found"})
                :res.status(200).json({message:"loyaltyCardProgram updated succefuly"});
                })
        } catch (error) {
            //console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }
    },

    getLoyaltyCardProgramById: async(req,res)=>{

        try {
            await LoyaltyCardProgram.findById(req.params.id).then(loyaltyCardProgramFound => {
                return (!loyaltyCardProgramFound)? res.status(200).json({message:" loyalty Card Program not found"})
                :res.status(200).json(loyaltyCardProgramFound);
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }
    },

    deleteLoyaltyCardProgramById: async(req,res)=>{

        try {
            await LoyaltyCardProgram.findByIdAndDelete(req.params.id).then( async loyaltyCardProgramFound =>{
                
                return (!loyaltyCardProgramFound)? res.status(200).json({message:" loyalty Card Program not found"})
                :res.status(200).json({message:"loyalty Card Program deleted "});
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }
    }


}



module.exports = loyaltyCardProgramtCtrl;