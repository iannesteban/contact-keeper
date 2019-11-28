const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect db
connectDB();

//body parser
app.use(express.json( { extended: false } ));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
  console.log(`You're running port ${PORT}`)
});