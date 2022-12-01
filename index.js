const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const app = express();

// Produção
const conn = mongoose.connect(uri,{
    useNewUrlParser: true
})
.then(() => console.log('Connected to DB'))
.catch(console.error);

/*mongoose.connect('mongodb://localhost:27017/myapp',{
    useNewUrlParser: true
})
.then(() => console.log('Connected to DB'))
.catch(console.error);*/


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