'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lrb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.WebSiteUsers, { foreignKey: 'userID' });
      this.belongsTo(models.Post, { foreignKey: 'PostID' });
    }
  }
  lrb.init({
    likes:{
      type:DataTypes.BOOLEAN,
    },
    retweet:{
      type:DataTypes.BOOLEAN,
    },
    bookmarks:{
      type:DataTypes.BOOLEAN,
    },
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostID:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
   }, 
  {
    sequelize,
    modelName: 'lrb',
    tableName: 'lrbs'
  });
  return lrb;
};