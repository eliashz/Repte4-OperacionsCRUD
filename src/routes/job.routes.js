const jobs = require('../controller/job.controller');
const router = require('express').Router();

router.get('/', jobs.findAll);
router.post('/', jobs.create);
router.get('/:id', jobs.findOne);
router.put('/', jobs.update);
router.delete('/:id', jobs.delete);


module.exports = router;