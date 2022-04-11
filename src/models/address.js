const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

    city: {
        type: String,
        default:""
    },
    postalCode: {
        type: Number,
        default:0
    },
    street: {
        type: String,
        default: ""
    }
})

module.exports= mongoose.model("Address",addressSchema);