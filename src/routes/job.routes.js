module.exports = app => {
    const users = require('../controller/user.controller');
    const router = require('express').Router();

    router.post('/', jobs.create("hola"));
    router.get('/', jobs.findAll);
    router.get('/:id', jobs.findOne);
    router.put('/', jobs.update);

    app.use('/api/jobs', router);
};