const db = require('../model');
const Job = db.jobs;

// Find all models
exports.findAll = async (req, res, next) => {
    const jobs = await Job.find({});
    if (jobs.length === 0){
        return res.status(400).send({ message: "No data in data base yet."})
    }
    res.send(jobs);
};

// Create model
exports.create = async (req, res) => {
    if (!req.body.department) {
        return res.status(404).send({ message: "Content can not be empty."});
    }

    // Create model
    const job = new Job({
        department: req.body.department
    });

    // Save in database
    job
        .save(job)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a job."
            });
        });
};

// Find one model by ID
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const job = await Job.findById(id);   
        if (job) {
            return res.status(201).send(job)
        }
        res.status(404).send({ message: "Data not found."});
    } catch {
        res.status(400).send({ message: "Wrong ID format."});
    }
};

// Update a model 
exports.update = async (req, res) => {
    if (!req.body._id) {
        return res.status(400).send({
            message: "Data to update can not be empty."
        });
    }

    const id = req.body._id;
    try {
        let job = await Job.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
   
        if (!job) {
            return res.status(404).send({ message: `ID ${id} not exists.` });
        } 
        job = await Job.findById(id);
        res.send(job)
    } catch (err) {
        res.status(500).send({ message: "Wrong ID format." });
    }   
};

// Delete model by ID
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteJob = await Job.findByIdAndRemove(id);
        if (!deleteJob) {
            return res.status(404).send({ message: "Job not found."})
        }
        res.status(201).send({ message: "Job deleted."})
    } catch {
        res.status(400).send({ message: "Wrong ID format."});
    }
};