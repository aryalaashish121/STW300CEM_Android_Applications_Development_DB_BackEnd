
// use the path of your model
const user = require('../Model/users');
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

    // the code below is for delete specific user testing
    it('to test the delete product is working or not', async () => {
        const status = await user.deleteOne({ _id: Object('5d1c8679d8b0ee18fcbd3650') });
        expect(status.ok).toBe(1);
    });
});

