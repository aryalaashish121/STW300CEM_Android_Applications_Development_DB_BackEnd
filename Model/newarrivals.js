const mongoose = require('mongoose');

const NewArrivalsSchema = mongoose.Schema({

    productName:{
        type:String
    },
    productPrice:{
        type:Number
    },
    Image:{
        type:String
    },
    productDescription:{
        type:String
    }

})
module.exports = mongoose.model("newarrivals",NewArrivalsSchema)