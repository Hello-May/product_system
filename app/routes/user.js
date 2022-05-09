const userController = require('../controllers/user.js');
const { handleErr } = require('../functions/error.js');

module.exports = router => {
    router.get('', async (req, res) => {
        try {
            res.send(await userController.index());
        } catch (err) {
            handleErr(err, res);
        }
    });
}