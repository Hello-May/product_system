const db = require('../models/index.js');
const jwt = require("jsonwebtoken");
const { genErr } = require('../functions/error.js');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw genErr('Please take token.', 401);

        const { id } = jwt.decode(token, process.env.SECRET);
        const password = (await db.User.findByPk(id, { attributes: ['password'] })).getDataValue('password');

        jwt.verify(token, password, (err) => {
            if (err) throw genErr(err.toString() || 'Unauthorized token.', 401);
        });
        const user = await db.User.findByPk(id, {
            include: [{
                model: db.Token,
                required: true,
                where: { token: token }
            }]
        });
        if (!user) throw genErr('Unauthorized user.', 401);

        req.auth = { token: token, user: user };
        next();
    } catch (err) {
        res.status(err.code || 500).send({ Error: err.message });
    }
}