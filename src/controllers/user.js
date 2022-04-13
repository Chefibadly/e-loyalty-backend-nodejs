const 
    User = require("../models/user"),
    {validationResult} = require("express-validator"), 
    jwt = require('jsonwebtoken'),
    Wallet = require('../models/wallet'),
    expressJwt = require('express-jwt'),
    LoyaltyCard = require('../models/loyaltyCard'),
    LoyaltyCardprogram = require('../models/loyaltyCardProgram')

    userCtrl={
        signup : (req,res)=>{
            const errors =validationResult(req);
        
            if(!errors.isEmpty()){
                return res.status(400).json({
                    error: errors.array()[0].msg
                })
            }
            let wallet = new Wallet({balance:500});
            let user = new User(req.body);
            user.createWallet(wallet);
            
            user.save((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Unable to add user"+err
                    })
                }
        
                wallet.save((err,wallet)=>{
                    if(err){
                        return res.status(400).json({msg:"unable to add wallet"});
                    }
                })

                return res.json({
                    message: "Success",
                    user
                })
            });
        },
        signin : (req,res)=>{
            const {phoneNumber, password} =req.body;
        
            User.findOne({phoneNumber},(err,user)=>{
                if(err || !user){
                    return res.status(400).json({
                        error: "phone number was not found"
                    })
                }
                // authenticate user
        
                if(!user.authenticate(password)){
                    return res.status(400).json({
                        error: "phone number and password do not match"
                    })
                }
        
                // create tokken
                const token = jwt.sign({_id: user._id}, process.env.SECRET)
        
                // Put token into cookies
                res.cookie('token', token, {expire: new Date()+15})
        
                // send response
                const {_id, name, phoneNumber} = user;
                return res.json({
                    token,
                    user:{
                        _id,
                        name,
                        phoneNumber
                    }
        
                })
            })
        
        },
        signout : (req,res)=>{
            res.clearCookie("token");
            return res.json({
                message: "User signout succefull"
            });
        },
        getAllUsers : async(req,res) =>{
            try {
                const users  = await User.find();
                /*if(!users.length)
                {
                    return res.status(200).json({message:"0 users found"})
                }
                return res.status(200).json(users);*/
                return (!users.length)?res.status(200).json({message:"0 users found"})
                :res.status(200).json(users);
            } catch (error) {
                console.log(error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        getUserById : async(req,res) =>{
            try {
                await User.findById(req.params.id).then(userFound => {
                    return (!userFound)? res.status(200).json({message:" user not found"})
                    :res.status(200).json(userFound);
                })
            } catch (error) {
                console.log(error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        deleteUserById : (req,res) =>{
            try {
                User.findByIdAndDelete(req.params.id).then(userFound =>{
                    return (!userFound)? res.status(200).json({message:" user not found"})
                    :res.status(200).json({message:"user deleted succefuly"});
                })
            } catch (error) {
                console.log(error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },
        updateUserById : async (req,res) =>{
            try {
                await User.findByIdAndUpdate(req.params.id,{name: req.body.name, lastname: req.body.lastname, phoneNumber: req.body.phoneNumber})
                .then(userFound =>{
                    return (!userFound)? res.status(200).json({message:" user not found"})
                    :res.status(200).json({message:"user updated succefuly"});
                    })
            } catch (error) {
                //console.log(error.message)
                return res.status(500).json({msg: "Server error"});
            }
        },

        addLoyaltyCard: async (req,res) => {
            
            try {
               
                const user = await User.findOne({_id:req.params.id});
                if(!user){
                    res.status(200).json({message:" user not found"});
                }else{
                    const loyaltycard = new LoyaltyCard({
                        validationDate:req.body.validationDate,
                        id_client:req.params.id,
                        id_program:req.body.id_program,
                    });
                    loyaltycard.save(async(error,loyaltycard)=>{
                        /* return (!error)? res.status(201).json({message:"loyalty card created succ",loyaltycard})
                        :res.status(400).json({error:"unable to add loyalty card"}) */

                        if(error){
                            return res.status(400).json({error:"unable to add loyalty card"})
                        }else{
                            await Wallet.findById(user.wallet).then(async walletFound=>{
                                //console.log(walletFound)
                            const loyaltycards = walletFound.addLoyaltyCard(loyaltycard);
                            console.log("heeereeeee user wallet"+loyaltycard)
                            await Wallet.updateOne({_id:user.wallet},{loyaltyCards:loyaltycards})
                            .then(async walletFound=>{
                                await LoyaltyCardprogram.findById(loyaltycard.id_program).then(async loyaltyCardprogramFound=>{
                                    const customers = loyaltyCardprogramFound.addCustomersToProgram(user);
                                    await LoyaltyCardprogram.updateOne({_id:loyaltyCardprogramFound._id},{customers:customers})
                                })
                                return res.status(201).json({message:"loyalty card created succ",loyaltycard,message:"wallet updated succ",walletFound})
                            })
                            })
                            
                        }
                    })

                }
                
            } catch (error) {
                console.log(error.message)
                return res.status(500).json({msg: "Server error"});
            }
        }

    };
    module.exports = userCtrl;