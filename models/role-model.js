const { DataTypes } = require('sequelize');
const db = require('./index');

const roleModel = db.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
});

module.exports = roleModel;