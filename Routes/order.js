const express = require("express");
const router = express.Router();
const order = require("../Model/order");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');

//add orders
router.post("/addOrders", (req, res) => {
    console.log("User Orders kicking...")
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
    newOrder.save().then(function () {
        response = "Your Order is sucessfully placed. Continue shopping with us !!!";
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Something Went wrong! Please try again !!";
        console.log(response);
        res.send(response);
    })
});

router.get('/orderDetails/:id', (req, res) => {

    uid = req.params.id.toString();
    console.log("order details Item kicking ............................... with userid" + uid)
    console.log(uid);
    order.find({ userID: uid }).then(function (cartData) {
        res.json(cartData);
        console.log("order values " + cartData);
    }).catch(function (e) {
        res.send(e)
    });

})

router.get('/getAllOrder', function (req, res) {
    console.log("Order list ......Responding.............");
    order.find().then(function (arrivalsdata) {
        res.send(arrivalsdata);
        console.log(arrivalsdata);
    }).catch(function (e) {
        res.send(e)
    });
})

router.post('/delivered', function (req, res) {

})


module.exports = router;