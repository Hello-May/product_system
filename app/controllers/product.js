const db = require('../models/index.js');
const { genErr } = require('../functions/error.js');

module.exports = {
    index: async () => {
        return await db.Product.scope('withoutNote').findAll();
    },
    store: async (data) => {
        return await db.Product.create(data);
    },
    show: async (id) => {
        const product = await db.Product.findByPk(id);
        if (!product) throw genErr('Data not found.', 404);
        return product;
    },
    update: async (id, data, auth) => {
        const product = await db.Product.findByPk(id);
        if (!product) throw genErr('Data not found.', 404);
        return await product.update(data, { id: auth.user.id });
    },
    destroy: async (id) => {
        const product = await db.Product.findByPk(id);
        if (!product) throw genErr('Data not found.', 404);
        return await product.destroy();
    }
}