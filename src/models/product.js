const mongoose=require("mongoose");
Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true

    },

    reference:{
        type: String,
        unique:true,
        required:true
    },

    price:{
        type: Number,
        required:true,
        default:0
    },

    description:{
        type: String,
        unique:false,
        required:false
    },

    quantity:{
        type: Number,
        default:1
    },

    /* businesses:{
        type: Schema.Types.ObjectId, 
        ref:'Business'
    } */

})

productSchema.methods = {
    addBusinessId:function(business){
        this.businesses.push(business)
        return this.businesses
    }
}

module.exports = mongoose.model("Product",productSchema)