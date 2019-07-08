const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({

    productID: {
        type: String
    },
    userID: {
        type: String
    },
    date: {
        type: Date
    },
    quantity: {
        type: Number
    }
})
module.exports = mongoose.model("cart", CartSchema)