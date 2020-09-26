var faker = require('faker');
faker.seed(123);
let nameList = [];

[...Array(16).keys()].forEach(i => {
    nameList.push(faker.name.findName())
})

module.exports = nameList;