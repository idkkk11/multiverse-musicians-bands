const {Sequelize, sequelize, Model, DataTypes} = require('../db');

// TODO - define the Song model
class Song extends Model {}

Song.init({
    name: DataTypes.STRING
},{
    sequelize: sequelize,
    modelName: "Song"
});

module.exports = {
    Song
};