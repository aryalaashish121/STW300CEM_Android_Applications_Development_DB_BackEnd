
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const orderSchema = new mongoose.Schema({
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



const order = mongoose.model("orders", orderSchema);
module.exports = order;