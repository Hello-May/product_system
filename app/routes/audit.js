const auditController = require('../controllers/audit.js');
const { handleErr } = require('../functions/error.js');

module.exports = router => {
    router.get('', async (req, res) => {
        try {
            res.send(await auditController.index());
        } catch (err) {
            handleErr(err, res);
        }
    });
}