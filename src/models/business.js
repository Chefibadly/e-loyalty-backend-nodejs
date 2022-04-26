const mongoose=require("mongoose");
crypto = require("crypto"),
Address = require('./address').schema;

const businessSchema = new mongoose.Schema({

    businessName: {
        type: String,
        //required: true,
        default: 'test default'
    },
    businessNiche: [String],
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rating: {
        type: Number,
        default:1
    },
    //to change for late
    sales: [{
        type: String
    }],
    //to change later
    customers:[{
        type:String
    }],
    address:{
        type:String
    },
    encry_password: {
        type: String,
        required: true
    },
    /* loyaltyCardPrograms: [{
        type: Schema.Types.ObjectId, 
        ref:'LoyaltyCardProgram',
        
    }], */

    products:[{
        type: Schema.Types.ObjectId, 
        ref:'Product',
    }],



    salt: String,

},{timestamps:true})

businessSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuid();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

businessSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";

        try{
            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex");
        }catch(err){
            return (err);
        }
    },
    /* addLoyaltyCardProgram: function(loyaltyCardProgram){
        this.loyaltyCardPrograms.push(loyaltyCardProgram);
        return this.loyaltyCardPrograms;
    }, */
    addProduct: function(product){
        this.products.push(product);
        return this.products;
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

module.exports = mongoose.model("Business",businessSchema)