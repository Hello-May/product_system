const productController = require('../controllers/product.js');
const { handleErr } = require('../functions/error.js');

module.exports = router => {
    router.get('', async (req, res) => {
        try {
            res.send(await productController.index());
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.post('', async (req, res) => {
        try {
            res.send(await productController.store(req.body));
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.get('/:id', async (req, res) => {
        try {
            res.send(await productController.show(req.params.id));
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.patch('/:id', async (req, res) => {
        try {
            res.send(await productController.update(req.params.id, req.body, req.auth));
        } catch (err) {
            handleErr(err, res);
        }
    });
    router.delete('/:id', async (req, res) => {
        try {
            res.send(await productController.destroy(req.params.id));
        } catch (err) {
            handleErr(err, res);
        }
    });
}
