const users = require('../controller/user.controller');
const router = require('express').Router();

router.post('/', users.create);
router.get('/', users.findAll);
router.get('/:id', users.findOne);
router.put('/', users.update);
router.delete('/', users.delete);

module.exports = router;