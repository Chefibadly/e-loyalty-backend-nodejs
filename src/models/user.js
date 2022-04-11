const
    mongoose=require("mongoose"),
    crypto = require("crypto"),
    Schema = mongoose.Schema,
    Wallet = require('./wallet').schema;
//const uuidv1 = require("uuid");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname:{
        type:String,
        maxlength: 32,
        trim: true
    },
    phoneNumber:{
        type:String,
        trim: true,
        required: true,
        unique: true,
    },
    encry_password: {
        type: String,
        required: true
    },
    wallet:{
        type:Schema.Types.ObjectId, ref:'Wallet'
    },
    salt: String,
    
},  {timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuid();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {
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
    createWallet: function(wallet){
        this.wallet = wallet;
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

module.exports = mongoose.model("User",userSchema)