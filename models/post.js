'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      // userId
      this.belongsTo(User,{foreignKey:'userId'})
    }
    toJSON(){
      return { ...this.get(), id:undefined,userId:undefined}
      }
  }
  Post.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uuid : {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    userId : {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'Post',
  });
  return Post;
};