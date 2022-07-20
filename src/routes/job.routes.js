const jobs = require('../controller/job.controller');
const router = require('express').Router();

router.post('/', jobs.create);
router.get('/', jobs.findAll);
router.get('/:id', jobs.findOne);
router.put('/', jobs.update);
router.put('/', jobs.update);

module.exports = router;