const { DataTypes } = require('sequelize');
const db = require('./index');

const userModel = db.define('User', {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.NUMBER,
    address: DataTypes.STRING
});

module.exports = userModel;