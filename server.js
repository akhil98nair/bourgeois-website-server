const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '10mb'}));

//API End points - 
const slidesRouter = require('./routes/slides');
const categoriesRouter = require('./routes/categories');
const testimonailsRouter = require('./routes/testimonials');
const projectsRouter = require('./routes/projects')

app.use('/slides', slidesRouter);
app.use('/categories', categoriesRouter);
app.use('/testimonials', testimonailsRouter);
app.use('/projects', projectsRouter);

//Database Uri
const CONNECTION_URL = 'mongodb+srv://dbUser:dbPassword@cluster0.aumo1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => {
        console.log(error);
    });
mongoose.set('useFindAndModify', false);

