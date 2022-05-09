'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Token);
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() { return this.getDataValue('id'); }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      get() { return this.getDataValue('name'); }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        async isUnique(value, next) {
          const user = await User.findOne({ where: { email: value }, attributes: ['id'] });
          if (user) return next('Email address has already been taken.');
          next();
        }
      },
      get() { return this.getDataValue('email'); }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      get() { return this.getDataValue('password'); }
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
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    },
  });
  return User;
};