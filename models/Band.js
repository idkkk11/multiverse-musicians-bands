const {Sequelize, sequelize, Model, DataTypes} = require('../db');

// TODO - define the Band model
class Band extends Model {}

Band.init({
    name: DataTypes.STRING
},{
    sequelize: sequelize,
    modelName: "Band"
});

module.exports = {
    Band
};