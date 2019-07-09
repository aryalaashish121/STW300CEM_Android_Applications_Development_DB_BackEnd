const express = require("express");
const router = express.Router();
const cart = require("../Model/cart");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');

router.get("/checkRespond", (req, res) => {
    console.log("New arrivals route is kiking")
    res.send("Responding")
})
router.post("/addToCart", (req, res) => {
    console.log("Cart responding...");
    var productID = req.body.productID;
    var userID = req.body.userID;
    var orderedTime = req.body.date;
    var quantity = req.body.quantity;

    var newCart = new cart(
        {
            "productID": productID,
            "userID": userID,
            "date": orderedTime,
            "quantity": quantity
        }
    )
    console.log("Request------>" + newCart);
    newCart.save().then(function () {
        response = "Added to cart !!!";
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Something Went wrong! Please try again !!";
        console.log(response);
        res.send(response);
    })
})
router.put('/updateCart/:id', function (req, res) {
    console.log("update specific cart quantity kicking...")
    uid = req.params.id.toString();
    console.log("user id...................................................................." + uid)
    // console.log(req.body);
    var q = req.body.quantity
    var newcart = new cart({
        "quantity": req.body.quantity
    })
    console.log(newcart);
    cart.findByIdAndUpdate({ _id: uid }, { quantity: req.body.quantity }).then(function () {
        console.log("cart updated.")
        res.send();
    }).catch(function (e) {
        console.log("error is updating..")
    })
});
router.get('/deleteCart', function (req, res) {
    cart.remove().then(function () {
        console.log("cart deleted");
    }).catch(function (e) {
        console.log("Error")
    })
})
router.post('/deleteCartItem/:id', function (req, res) {
    console.log("Delete specific cart item is kicking ...............................")
    cartid = req.params.id.toString();
    console.log(cartid);
    cart.findByIdAndDelete({ _id: cartid }).then(function () {
        res.send();
        console.log("Data deleted")
    }).catch(function (e) {
        res.send(e)
    });
})
router.get('/cartDetails/:id', (req, res) => {
    console.log("Get Cart Item kicking ...............................")
    uid = req.params.id.toString();
    console.log(uid);
    cart.find({ userID: uid }).then(function (cartData) {
        res.json(cartData);
        console.log("cart value " + cartData);
    }).catch(function (e) {
        res.send(e)
    });



})

module.exports = router;