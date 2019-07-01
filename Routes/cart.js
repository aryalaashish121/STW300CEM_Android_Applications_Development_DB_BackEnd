const express = require("express");
const router = express.Router();
const newarrivals = require("../Model/cart");
const mongoose = require("mongoose");
const Auth = require('../middleware/auth');
const multer = require("multer");
const path = require('path');

router.get("/checkRespond", (req, res) => {
    console.log("New arrivals route is kiking")
    res.send("Responding")
})
router.post("/addProducts", (req, res) => {
    console.log("Cart responding...");
 
})

