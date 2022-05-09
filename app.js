require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: [
        'http://localhost:8000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// router start

const api = express.Router();
app.use('/api', api);

const authRouter = express.Router({ mergeParams: true });
const userRouter = express.Router({ mergeParams: true });
const productRouter = express.Router({ mergeParams: true });
const auditRouter = express.Router({ mergeParams: true });

const jwtMiddleware = require('./app/middlewares/jwt.js');

api.use('/auth', authRouter);
api.use('/user', jwtMiddleware, userRouter);
api.use('/product', jwtMiddleware, productRouter);
api.use('/audit', jwtMiddleware, auditRouter);

require('./app/routes/auth.js')(jwtMiddleware, authRouter);
require('./app/routes/user.js')(userRouter);
require('./app/routes/product.js')(productRouter);
require('./app/routes/audit.js')(auditRouter);

// router end

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});