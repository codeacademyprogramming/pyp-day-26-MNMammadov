// import mongoose from 'mongoose';
const express = require('express');
const cors = require('cors');
const mongoosee = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoosee.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoosee.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const reservationsRouter = require('./routes/reservations');


app.use('/reservations', reservationsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
