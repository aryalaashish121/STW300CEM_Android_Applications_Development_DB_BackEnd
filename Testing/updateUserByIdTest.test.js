
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
describe('User schema test anything', () => {

    // updating specific user testing starts here....
    it('to test the update for specific user using id', async () => {
        return users.findOneAndUpdate({ _id: Object('5d234bbb8c3669170cb3272b') }, //here we manually provide one of the store id in database

            { $set: { userName: 'Testing Aashish' } })
            .then((userdata) => {
                expect(userdata.userName).toEqual('Testing Aashish')
            })

    });

});

