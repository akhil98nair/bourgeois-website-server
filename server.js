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
const homeRouter = require('./routes/home')
const partnersRouter = require('./routes/partners')
const membersRouter = require('./routes/members')

app.use('/home', homeRouter);
app.use('/slides', slidesRouter);
app.use('/categories', categoriesRouter);
app.use('/testimonials', testimonailsRouter);
app.use('/projects', projectsRouter);
app.use('/partners', partnersRouter);
app.use('/members', membersRouter);

//Database Uri
const CONNECTION_URL = process.env.ATLAS_URI;

mongoose.connect(CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => {
        console.log(error);
    });
mongoose.set('useFindAndModify', false);

