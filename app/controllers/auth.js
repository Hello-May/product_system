const db = require('../models/index.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genErr } = require('../functions/error.js');

module.exports = {
    register: async (data) => {
        const user = await db.User.build(data);
        await user.validate();
        user.setDataValue('password', bcrypt.hashSync(user.getDataValue('password'), 8));
        await user.save();
        await user.reload();
        return user;
    },
    login: async (data) => {
        if (!data.email) throw genErr('User.email cannot be null.', 422);
        if (!data.password) throw genErr('User.password cannot be null.', 422);

        const user = await db.User.findOne({ where: { email: data.email } });
        if (!user) throw genErr('User does not exist.', 404);

        const password = (await db.User.findOne({ where: { email: data.email }, attributes: ['password'] })).getDataValue('password');
        const passwordIsValid = bcrypt.compareSync(data.password, password);
        if (!passwordIsValid) throw genErr('Password Incorrect.', 401);

        const token = jwt.sign(user.toJSON(), password, {
            expiresIn: 86400 * 3 // 24 hours * 3 days
        });

        await db.Token.create({ token: token, userId: user.getDataValue('id') });
        return { user: user, token: token };
    },
    logout: async (auth) => {
        // 可以只刪除此筆 token，不過我想此 user 的 tokens 全刪。
        await db.Token.destroy({ where: { userId: auth.user.id } });
        return 'Logged out.';
    },
    user: async (auth) => {
        return auth;
    }
}