const mongoose=require("mongoose");
Schema = mongoose.Schema;
const crypto = require("crypto");

const walletSchema = new mongoose.Schema({

    walletNumber :{
        type: String,
        required : true,
        trim: true,
        default: "000-000-000-000-test"
    },

    balance : {
        type: Number,
        default: 0.00,

    },
    loyaltyCards: [{
        type: Schema.Types.ObjectId, ref:'LoyaltyCard'
    }]

}
);

walletSchema.methods = {
    addLoyaltyCard: function(loyaltyCard){
         this.loyaltyCards.push(loyaltyCard);
         return this.loyaltyCards;
    }
}

module.exports= mongoose.model("Wallet",walletSchema);