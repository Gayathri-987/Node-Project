'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
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
  Expenses.init({
    category: DataTypes.STRING,
    otherCategory: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE, 
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
    modelName: 'Expenses',
    tableName: 'Expenses',
  });
  return Expenses;
};