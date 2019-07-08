const express = require("express");
const router = express.Router();
const delivery = require("../Model/delivery");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');


router.post("/addDelivered", (req, res) => {
    console.log("Delivered product Orders kicking...")
    console.log(req.body)
    var productID = req.body.productID;
    var userID = req.body.userID;
    var Quantity = req.body.Quantity;
    var orderedDate = req.body.orderedDate;
    var orderedTime = req.body.orderedTime;
    var newOrder = new order(
        {
            "productID": productID,
            "userID": userID,
            "Quantity": Quantity,
            "orderedDate": orderedDate,
            "orderedTime": orderedTime
        }
    )
    console.log("Request------>" + newOrder);
    delivery.save().then(function () {
        response = "Delivered product description........................";
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Something Went wrong! Please try again !!";
        console.log(response);
        res.send(response);
    })
});
module.exports = router;
