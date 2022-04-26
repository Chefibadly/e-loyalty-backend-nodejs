const 
    Business = require('../models/business'),
    jwt = require('jsonwebtoken'),
    LoyaltyCardProgram = require('../models/loyaltyCardProgram'),
    Product = require('../models/product');

productCtrl={

    addProduct: async (req,res)=>{
        const product = new Product(req.body)
        try {
            await Business.findById(req.params.id).then(async businessFound =>{
                if(!businessFound){
                    return res.status(400).json({
                        error: "Business is not found "
                    })
                }else{
                    await Product.findOne({name:product.name}).then(async productFound =>{
                        if(productFound){
                            console.log("update product",productFound)
                            await Product.updateOne({_id:productFound._id},{quantity:product.quantity+productFound.quantity})
                            return res.status(200).json({
                                message: "product updated succefully",
                                product
                            })
                        }else{
                            await product.save(async(err,product)=>{
                                if(err){
                                    console.log("hello"+product)
                                    return res.status(400).json({
                                        error: "Unable to add product"+err
                                    })
                                }else{
                                    const products = businessFound.addProduct(product);
                                    console.log("products and business",products,+" "+businessFound)
                                    await Business.updateOne({_id:businessFound._id},{products:products})
                                    return res.status(200).json({
                                        message: "Success",
                                        product
                                    })
                                }
                                
                            })
                        }
                    })
                    
                }
            })
            
            
        } catch (error) {
            console.log('inside catch product'+error);
        }
    },

    deleteProductById: async(req,res) => {

        try {
            Product.findByIdAndDelete(req.params.id).then(productFound =>{
                return (!productFound)? res.status(200).json({message:" product not found"})
                :res.status(200).json({message:"product deleted succefuly"});
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }
    },

    getAllProducts: async(req,res) =>{

        try {
            const products  = await Product.find();
            return (!products.length)?res.status(200).json({message:"0 products found"})
            :res.status(200).json(products);
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }

    },
    updateProductById: async (req,res) =>{
        try {
            await Product.findByIdAndUpdate(req.params.id,
                {name: req.body.name, price: req.body.price, description: req.body.description,quantity:req.body.quantity})
            .then(productFound =>{
                return (!productFound)? res.status(200).json({message:" product not found"})
                :res.status(200).json({message:"product updated succefuly"});
                })
        } catch (error) {
            //console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }
    },

    getProductById: async(req,res)=>{
        try {
            await Product.findById(req.params.id).then(productFound => {
                return (!productFound)? res.status(200).json({message:" product not found"})
                :res.status(200).json(productFound);
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg: "Server error"});
        }
    }
}

module.exports = productCtrl;