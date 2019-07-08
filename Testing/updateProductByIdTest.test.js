
// use the path of your model
const product = require('../Model/products');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/PcworlD_database';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('product schema test anything', () => {

    // updating specific product testing starts here....
    it('to test the update for specific user using id', async () => {
        return product.findOneAndUpdate({ _id: Object('5d1c8679d8b0ee18fcbd3650') }, //here we manually provide one of the store id in database

            { $set: { productName: 'product update' } })
            .then((productData) => {
                expect(productData.productName).toEqual('product update')
            })

    });

});

