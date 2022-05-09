'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Token.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() { return this.getDataValue('id'); }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async isExist(value, next) {
          const user = await sequelize.models.User.findByPk(value, { attributes: ['id'] });
          if (!user) return next('User does not exist.');
          next();
        }
      },
      references: {
        model: 'Users',
        key: 'id'
      },
      get() { return this.getDataValue('userId'); }
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      get() { return this.getDataValue('token'); }
    },
    createdAt: {
      type: DataTypes.DATE,
      get() { return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss'); }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() { return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss'); }
    }
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};