module.exports = {
    genErr: (msg, code) => {
        return Object.assign(Error(msg), { code: code });
    },
    handleErr: (err, res) => {
        if (err.name === 'SequelizeValidationError')
            res.status(422).send({ Errors: err.errors?.map(o => o.message) });
        else
            res.status(err.code || 500).send({ Error: err.message });
    }
}