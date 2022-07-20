const user = require('../controller/user.controller');
const router = require('express').Router();

router.get('/', user.findAll);
router.post('/', user.create);
router.get('/:id', user.findOne);
router.put('/', user.update);
router.put('/', user.update);

module.exports = router;