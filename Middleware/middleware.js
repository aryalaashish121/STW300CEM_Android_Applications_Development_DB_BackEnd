const auth = function (req, res, next) {
    console.log("Middleware")
    next()
}
module.exports = auth