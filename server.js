// Dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");
const db = fs.readFileSync("./db/db.json");

// read and parse db.json content
const rawData = JSON.parse(db);
console.log(rawData);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Retrieve any static files
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
// GET /api/notes should read the db.json file and return all saved notes as JSON.

// app.get('/notes', (req, res) => {
//     res.json()
// });

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// PORT listener to serve the app
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
