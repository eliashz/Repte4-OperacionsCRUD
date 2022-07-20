const express = require('express');
const db = require('./src/model');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Connect data base
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database.");
    })
    .catch(err => {
        console.log("Cannot connect to database", err);
        process.exit();
    })

// Routes
app.use('/api/users', require('./src/routes/user.routes'));

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: {message: error.message} })
}); 

// Set and run port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});