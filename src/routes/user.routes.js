module.exports = app => {
    const users = require('../controller/user.controller');
    const router = require('express').Router();

    router.post('/', users.create);
    router.get('/', users.findAll);
    router.get('/:id', users.findOne);
    router.put('/', users.update);

    app.use('/api/users', router);
};