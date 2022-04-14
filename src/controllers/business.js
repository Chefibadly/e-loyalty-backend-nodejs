const 
    Business = require('../models/business'),
    jwt = require('jsonwebtoken'),
    LoyaltyCardProgram = require('../models/loyaltyCardProgram'),
    Product = require('../models/product'),
    generateQRCode = require('../helpers/generateQRCode'),
    //Jimp = require("jimp"),
    QRCode = require('easyqrcodejs-nodejs');


businessCtrl = {

    signin : (req,res) =>{
        const {username, password} =req.body;
        
            Business.findOne({username},(err,business)=>{
                if(err || !business){
                    return res.status(400).json({
                        error: "username was not found"
                    })
                }
                // authenticate user(business)
        
                if(!business.authenticate(password)){
                    return res.status(400).json({
                        error: "username and password do not match"
                    })
                }
        
                // create tokken
                const token = jwt.sign({_id: business._id}, process.env.SECRET)
        
                // Put token into cookies
                res.cookie('token', token, {expire: new Date()+1})
        
                // send response
                const {_id, username} = business;
                return res.json({
                    token,
                    business:business
                })
            })
        
        },

        signup : (req,res) =>{

            const business = new Business(req.body);
            
            business.save((err,business)=>{
                if(err){
                    return res.status(400).json({
                        error: "Unable to add business"+err
                    })
                }
        

                return res.json({
                    message: "Success",
                    business
                })
            });
        },

        createLoyaltyCardProgram: async (req,res)=>{
            const loyaltyCardProgram = new LoyaltyCardProgram(req.body);
            try {
                
                
                await loyaltyCardProgram.save(async (error,loyaltyCardProgram)=>{
                    if(!error){
                        const business= req.body.business;
                await Business.findById(business).then(async businessFound =>{

                    //console.log(businessFound)
                    const loyaltyCardPrograms = businessFound.addLoyaltyCardProgram(loyaltyCardProgram);
                    console.log(businessFound._id)
                    await Business.findByIdAndUpdate(businessFound._id,{loyaltyCardPrograms:loyaltyCardPrograms})
                    .then(businessFound =>{
                        console.log("updated",businessFound);
                        return (!businessFound)? res.status(200).json({message:" business not found"})
                        :res.status(200).json({
                            message_2:"business updated succefuly",
                            message_1: "loyalty card created",
                            loyaltyCardPrograms
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
                
                
                //console.log(business)
                
                //console.log(loyaltyCards)
        },

        createQRCode: async(req,res)=>{
            /* const dataString = JSON.stringify(req.body)
            const qrcode = await generateQRCode.generateQRCode(dataString).then(
                async url =>{
                    //console.log(url);
                    return res.status(200).json(url);
                }
            ); */
            // Options
            const dataString = JSON.stringify(req.body)
            const options = {
                text: dataString
            };

            // New instance with options
            var qrcode = new QRCode(options);

            // Save QRCode image
            qrcode.saveImage({
                path: 'q.png' // save path
            });
            
        }

        
                
}

module.exports = businessCtrl;