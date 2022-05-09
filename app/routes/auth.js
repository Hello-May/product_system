const authController = require('../controllers/auth.js');
const { handleErr } = require('../functions/error.js');

module.exports = (jwtMiddleware, router) => {
    router.post('/register', async (req, res) => {
        try {
            res.send(await authController.register(req.body));
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.post('/login', async (req, res) => {
        try {
            res.send(await authController.login(req.body));
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.post('/logout', jwtMiddleware, async (req, res) => {
        try {
            res.send(await authController.logout(req.auth));
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.get('/user', jwtMiddleware, async (req, res) => {
        try {
            res.send(req.auth);
        } catch (err) {
            handleErr(err, res);
        }
    });
}