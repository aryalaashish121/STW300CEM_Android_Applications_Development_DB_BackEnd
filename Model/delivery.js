
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const deliverySchema = new mongoose.Schema({
    productID: {
        type: String
    },
    userID: {
        type: String
    },
    orderedDate: {
        type: Date
    },
    Quantity: {
        type: Number
    },
    orderedTime: {
        type: String
    }
});



const delivery = mongoose.model("delivered", deliverySchema);
module.exports = delivery;