const db = require('../models/index.js');

module.exports = {
    index: async () => {
        const audits = await db.Audit.findAll({ include: [db.User, db.Product] });
        const strArr = ['[createdAt]: [user](id) [actionType] [product](id) [field] [oldValue] [newValue]'];
        for (let audit of audits)
            strArr.push(`${audit.createdAt}: ${audit.User.name}(${audit.User.id}) ${audit.type} ${audit.Product.name}(${audit.Product.id}) ${audit.field} from ${audit.oldValue} to ${audit.newValue}.`);
        return strArr;
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