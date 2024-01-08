// app.js
const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
