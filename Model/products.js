const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productType:{
        type:String
    },
    productBrand:{
        type:String
    },
    productWarranty:{
        type:String
    },
    productColor:{
        type:String
    },
    productName:{
        type:String
    },
    productQuantity:{
        type:Number
    },
    productWeight:{
        type:String
    },
     productDescription:{
        type:String
    },
    productPrice:{
        type:Number
    },
    productDiscount:{
        type:Number
    },
    mainImage:{
        type:String
    },
    auxiliaryImage:{
        type:String
    }
    
});

module.exports = mongoose.model("products",productSchema)