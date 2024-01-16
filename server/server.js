const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const examplesRouter = require('./routes/example');
const artistsRouter = require('./routes/artist');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/examples', examplesRouter);
app.use('/artists', artistsRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
