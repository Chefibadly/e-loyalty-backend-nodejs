const mongoose=require("mongoose");
Schema = mongoose.Schema;

const loyaltyCardProgramSchema = new mongoose.Schema({

    titre:{
        type:String,
    },
    loyalty_program_type:
    {
        type:String,
        required:true

    },
    strategy: {
        type:String,
        unique:false,
        required:false
    },
    customers:[{
        type: Schema.Types.ObjectId,
        ref:'User'
        }],
    business:{
        type: Schema.Types.ObjectId, 
        ref:'Business'
    }
})

loyaltyCardProgramSchema.methods = {
    addCustomersToProgram: function(user){
        this.customers.push(user)
        return this.customers
    }
}

module.exports= mongoose.model("LoyaltyCardProgram",loyaltyCardProgramSchema);