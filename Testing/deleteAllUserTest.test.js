
// use the path of your model
const users = require('../Model/users');
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

    // the code below is for delete testing
    it('to test the delete product is working or not', async () => {
        const status = await users.deleteMany();
        expect(status.ok).toBe(1);
    });
});

