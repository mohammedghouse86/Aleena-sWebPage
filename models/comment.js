'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
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
  comment.init({
    comment:{
      type: DataTypes.STRING,
      allowNull: false
    },
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostID:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'comment',
    tableName: 'comments'
  });
  return comment;
};