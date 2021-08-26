const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '10mb'}));

//Database Uri
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb connected")
})


//API End points - 
const slidesRouter = require('./routes/slides');
const categoriesRouter = require('./routes/categories');
const testimonailsRouter = require('./routes/testimonials');
const projectsRouter = require('./routes/projects')


app.use('/',(req,res) => {
    res.send('Hello to mern exrecise tracker')
})
app.use('/slides', slidesRouter);
app.use('/categories', categoriesRouter);
app.use('/testimonials', testimonailsRouter);
app.use('/projects', projectsRouter);

app.listen(port, () => {
    console.log('Server is running on port:',port);
})