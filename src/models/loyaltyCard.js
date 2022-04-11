const mongoose = require("mongoose");

const loyaltyCardSchema = new mongoose.Schema({

    points:{
        type: Number,
        default: 0
    },
    checkPoints: [{
        checkpoint:{
            type: String
        },
        reached:{
            type:Boolean,
            default:0
        }
    }],
    rewards: {
        type: [String],
        default: []
    },
    //strin for the moment it should be changed to now date + days of valibility
    validationDate: {
        type: String,
    },
    id_client:{
        type: Schema.Types.ObjectId, ref:'User'
    },

    id_program:{
        type: Schema.Types.ObjectId, ref:'LoyaltyCardProgram'
    }

},{timestamps: true})

module.exports= mongoose.model("LoyaltyCard",loyaltyCardSchema);