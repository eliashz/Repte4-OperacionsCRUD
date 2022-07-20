const db = require('../model');
const User = db.users;

// Find all models
exports.findAll = (req, res) => {
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
        return res.status(404).send({ message: "Username used."});
    }

    // Check if the e-mail exists
    const findEmail = await User.find({ email: req.body.email});
    if (findEmail.length !== 0) {
        return res.status(404).send({ message: "e-mail used."});
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
    if (!req.body._id) {
        return res.status(400).send({
            message: "Data to update can not be empty."
        });
    }

    // Check if the name exists
    const findName = await User.find({ username: req.body.username});
    if (findName.length !== 0) {
        return res.status(404).send({ message: "Username used."});
    }

    // Check if the e-mail exists
    const findEmail = await User.find({ email: req.body.email});
    if (findEmail.length !== 0) {
        return res.status(404).send({ message: "e-mail used."});
    }

    const id = req.body._id;
    try {
        let user = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
   
        if (!user) {
            return res.status(404).send({ message: `ID ${id} not exists.` });
        } 
        user = await User.findById(id);
        res.send(user)
    } catch (err) {
        res.status(500).send({ message: "Wrong ID format." });
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