const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const homeRoutes = require("./routes/home");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/',homeRoutes);

app.listen(port, () => {
    console.log(`app is running at ${port}`);
  });  