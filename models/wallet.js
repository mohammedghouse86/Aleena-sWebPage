'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.WebSiteUsers, { foreignKey: 'userID' });
    }
  }
  Wallet.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    dollars:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have an Name'},
        notEmpty:{msg:'Name can not be EMPTY'},
        isInt:{msg:'Age Should be not be a string'},
      }
    },
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName:'Wallets',
    modelName: 'Wallet',
  });
  return Wallet;
};