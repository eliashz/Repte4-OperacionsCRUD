const users = require('../controller/user.controller');
const router = require('express').Router();

router.get('/', users.findAll);
router.post('/', users.create);
router.get('/:id', users.findOne);
router.put('/', users.update);
router.delete('/:id', users.delete);

module.exports = router;