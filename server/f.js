/*const mongoose = require('mongoose');*/
const fs = require('fs')
const csv = require('csv-parser')
/*
// Replace with your MongoDB connection string
const mongoURI = 'your_mongodb_connection_string';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define the schema based on your data
const dataSchema = new mongoose.Schema({
  // Define schema fields according to your CSV data
  // Example:
  column1: String,
  column2: String,
  // Add other columns as needed
});

const Data = mongoose.model('Data', dataSchema);
*/
// Read CSV file and upload data to MongoDB
fs.createReadStream('t.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row)
        /*  const newData = new Data(row);
    newData.save((err) => {
      if (err) return console.error(err);
      console.log('Data saved:', row);
    });*/
    })
    .on('end', () => {
        console.log('CSV file successfully processed')
    })
