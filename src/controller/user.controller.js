const db = require('../model');
const User = db.users;

// Find all models
exports.findAll = async (req, res, next) => {
    const users = await User.find({});
    if (users.length === 0){
        return res.status(400).send({ message: "No users in data base yet."})
    }
    res.send(users);
};

// Create model
exports.create = async (req, res) => {
    if (!req.body.username) {
        return res.status(404).send({ message: "Content can not be empty."});
    }

    // Check if the name exists
    const findName = await User.find({ username: req.body.username});
    if (findName.length !== 0) {
        return res.status(404).send({ message: "Name used."});
    }

    // Check if the e-mail exists
    const findEmail = await User.find({ email: req.body.email});
    if (findEmail.length !== 0) {
        return res.status(404).send({ message: "Email used."});
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
            return res.status(201).send(user)
        }
        res.status(404).send({ message: "User not found."});
    } catch {
        res.status(400).send({ message: "Wrong ID format."});
    }
};

// Update a model 
exports.update = async (req, res) => {
    console.log(req.body);
    if (!req.body._id) {
        return res.status(400).send({
            message: "Data to update can not be empty."
        });
    }
    const id = req.body._id;
    console.log(id);
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        console.log(user);
        if (!user) {
            return res.status(404).send({
                message: `Cannot update ID ${id}.`
            })
        } 
        res.send(user)
    } catch (err) {
        res.status(500).send({
            message: "Error updating user " + id
        });
    }   
};

// Delete model by ID
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteUser = await User.findByIdAndRemove(id);
        if (!deleteUser) {
            return res.status(404).send({ message: "User not found."})
        }
        res.status(201).send({ message: "User deleted."})
    } catch {
        res.status(400).send({ message: "Wrong ID format."});
    }
};