'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      },
      get() { return this.getDataValue('price'); }
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      get() { return this.getDataValue('note'); }
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
    modelName: 'Product',
    scopes: {
      withoutNote: {
        attributes: { exclude: ['note'] }
      }
    },
    hooks: {
      afterUpdate: async (o, opts) => {
        for (let field of o._changed) {
          await sequelize.models.Audit.create({
            type: 'update',
            productId: o.dataValues.id,
            userId: opts.id,
            field: field,
            oldValue: o._previousDataValues[field],
            newValue: o.dataValues[field]
          });
        }
      }
    },
  });
  return Product;
};