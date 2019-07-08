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
describe('user schema test anything', () => {
    // the code below is for insert testing
    it('user registration testing', () => {
        const user = {
            'userName': 'Aashish Aryal',
            'userEmail': 'aryalaashish1822055@gmail.com',
            'userPassword': 'password',
            'city': 'Kathmandu',
            'postal': '552200',
            'userAddress1': 'Samakhusi',
            'userAddress2': 'Samakhusi',
            'userImage': 'aashish.jpeg',
            'userPhone': '9850554205'
        };


        return users.create(user)
            .then((pro_ret) => {
                expect(pro_ret.postal).toEqual('552200');
            });

    });

})
