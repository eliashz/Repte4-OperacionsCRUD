const db = require('../model');
const User = db.users;

// Find all models
exports.findAll = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a user."
        });
    }
};

// Create model
exports.create = (req, res) => {
    if (!req.body.username) {
        return res.status(404).send({ message: "Content can not be empty."});
    }
    // Create model
    const user = new User({
        username: req.body.username,
        email: req.body.email
    });
    // Save in database
    user
        .save(user)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};

// Find one model by ID
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);   
        console.log(user);
        if (user) {
            return res.status(201).json(user)
        }
        res.status(404).send({ message: "User not found."});
    } catch {
        res.status(400).send({ message: "Wrong ID format."});

    }
};

// Update a model 
exports.update = (req, res) => {
  
};

// Delete model by ID
exports.delete = (req, res) => {

};