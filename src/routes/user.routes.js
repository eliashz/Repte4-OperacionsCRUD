module.exports = app => {
    const users = require('../controller/user.controller');
    const router = require('express').Router();
    router.post('/', users.create);

    app.use('/api/users', router);
};