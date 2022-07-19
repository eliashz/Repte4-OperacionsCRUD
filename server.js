const express = require('express');
const db = require('./src/model');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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

require('./src/routes/user.routes')(app);
    
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});