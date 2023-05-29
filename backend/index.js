const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost/react_mongodb_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema and model for the data
const dataSchema = new mongoose.Schema({
  inputText: String,
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());

// API route for saving data
app.post('/api/save', async (req, res) => {
  try {
    const { inputText } = req.body;
    const newData = new Data({ inputText });
    await newData.save();
    res.json(`Saved: ${inputText}`);
  } catch (error) {
    console.error(error);
    res.status(500).json('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});