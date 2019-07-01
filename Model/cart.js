const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({

    ProductID: {
        type: String
    },
    userID: {
        type: String
    },
    Quantity: {
        type: Number
    },
    date: {
        type: Date
    }
})
module.exports = mongoose.model("cart", CartSchema)