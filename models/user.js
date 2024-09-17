'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      this.hasMany(models.Post, { foreignKey: 'userID' });
      this.hasMany(models.lrb, { foreignKey: 'userID' });
      this.hasOne(models.Wallet, { foreignKey: 'userID' });
    }
    toJSON(){
      return {...this.get()} //return {...this.get(), id:undefined} Ghouse did this
    }

  }
  user.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have an Name'},
        notEmpty:{msg:'Name can not be EMPTY'}
      }
    },

    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have an Email'},
        notEmpty:{msg:'Email can not be EMPTY'},
        isEmail:{msg:'Must be a valid Email'}
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have an Role'},
        notEmpty:{msg:'Role can not be EMPTY'}
      }
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have an Name'},
        notEmpty:{msg:'Name can not be EMPTY'},
        isInt:{msg:'Age Should be not be a string'},
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have an Password'},
        notEmpty:{msg:'Password can not be EMPTY'}
      }
    },
    photo: {
      type: DataTypes.BLOB('long'), // BLOB to store image
      allowNull: true
    }
  }, {
    sequelize,
    tableName:'WebSiteUsers',
    modelName: 'WebSiteUsers',
  });
  return user;
};