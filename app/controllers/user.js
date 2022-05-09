const db = require('../models/index.js');

module.exports = {
    index: async () => {
        return await db.User.scope('withPassword').findAll();
    },
    store: async () => {

    },
    show: async () => {

    },
    update: async () => {

    },
    destroy: async () => {

    }
}