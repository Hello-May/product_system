'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Product);
    }
  }
  Audit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() { return this.getDataValue('id'); }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['create', 'update', 'destroy']],
      },
      get() { return this.getDataValue('type'); }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        async isExist(value, next) {
          const product = await sequelize.models.Product.findByPk(value, { attributes: ['id'] });
          if (!product) return next('Product does not exist.');
          next();
        }
      },
      references: { model: 'Products', key: 'id' },
      get() { return this.getDataValue('productId'); }
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
      references: { model: 'Users', key: 'id' },
      get() { return this.getDataValue('userId'); }
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
      get() { return this.getDataValue('field'); }
    },
    oldValue: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() { return this.getDataValue('oldValue'); }
    },
    newValue: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() { return this.getDataValue('newValue'); }
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
    modelName: 'Audit',
  });
  return Audit;
};