
// import faker from 'faker';
var faker = require('faker');
faker.seed(123);
let nameListTemp = [];

[...Array(16).keys()].forEach(i => {
    nameListTemp.push(faker.name.findName())
})

const nameList = nameListTemp;

module.exports = nameList;