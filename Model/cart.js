
const CartSchema = mongoose.Schema({

    productName: {
        type: String
    },
    productPrice: {
        type: Number
    },
    Image: {
        type: String
    },
    productDescription: {
        type: String
    },
    productType: {
        type: String
    }

})
module.exports = mongoose.model("cart", CartSchema)