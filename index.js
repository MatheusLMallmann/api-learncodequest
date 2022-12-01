const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserSchema = require("./models/user");

const PORT = process.env.PORT || 3000;

// Produção
/*mongoose.connect(MONGO_URL,{
    useNewUrlParser: true
})
.then(() => console.log('Connected to DB'))
.catch(console.error);

mongoose.connect('mongodb://localhost:27017/myapp',{
    useNewUrlParser: true
})
.then(() => console.log('Connected to DB'))
.catch(console.error);*/
const uri = process.env.MONGO_URL;

function startDatabase() {
    const con = mongoose.createConnection(uri)
    .asPromise()
    .then(() => console.log('Connected to DB'))
    .catch(console.error);

    mongoose.model('User', UserSchema);
}

startDatabase();

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

require('./controllers/userController')(app);
require('./controllers/projectController')(app);
require('./controllers/storeController')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});