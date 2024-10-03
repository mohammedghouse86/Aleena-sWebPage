'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      this.belongsTo(models.WebSiteUsers, { foreignKey: 'userID' });
      this.hasMany(models.lrb, { foreignKey: 'PostID' });
      this.hasMany(models.comment, { foreignKey: 'PostID' });
    }
  }
  
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'Post must be valid'},
        notEmpty:{msg:'Post cannot be EMPTY'},
        len: {
          args: [5, 120], // Minimum 3 characters, maximum 50 characters
          msg: 'Name must be between 10 and 120 characters long'
        }
      }
    },
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts'
  });

  return Post;
};
