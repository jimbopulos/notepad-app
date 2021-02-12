// Dependencies
const express = require('express');
const path = require('path');
const fs = require("fs");
let rawData = fs.readFileSync("./db/db.json");

// read and parse db.json content
let db = JSON.parse(rawData);
// console.log(db);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Retrieve any static files
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
// GET /api/notes to read the db.json file
app.get('/api/notes', (req, res) => {
    // return all saved notes as JSON
    res.json(db);
    console.log(db);
});

// Routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// POST /api/notes to receive a new note
app.post('/api/notes', (req, res) => {
    // save on the request body
    const newNote = req.body;
    res.json(newNote);
    // add it to the db.json file
    const addNewNote = db.push(newNote);
    // return the new note to the client | give each note a unique id
    
    // console.log(addNewNote);
})

// PORT listener to serve the app
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
