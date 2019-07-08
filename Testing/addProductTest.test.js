// use the path of your model
const products = require('../Model/products');
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
    // the code below is for insert testing
    it('Add product testing', () => {
        var product = {

            'productType': 'Laptop',
            'productBrand': 'Acer',
            'productWarranty': 'No warrenty',
            'productColor': 'Black',
            'productName': 'Acer E15',
            'productQuantity': '20',
            'productWeight': '1000',
            'productDescription': 'Good at affordable price',
            'productPrice': '16',
            'productDiscount': '25',
            'mainImage': 'product.jpg',
            'auxiliaryImage': 'product2.jpg'
        };

        return products.create(product)
            .then((pro_ret) => {
                expect(pro_ret.productName).toEqual('Acer E15');
            });
    });

})
