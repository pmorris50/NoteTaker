const express = require('express');
const path = require('path');
const fs = require('fs');
// const { clog } =require() //What is clog? why is it used?
const app = express();
const PORT = process.env.port || 3001;
const { v4: uuidv4} = require('uuid');
app.listen(PORT, ()=> {
    console.log(`now listening on port ${PORT}`)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//GET for Home Page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// GET Route to send back to home page 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Get Route to return all saved notes as JSON
app.get('api/notes', (req, res) => {
   // res.json(//all saved notes)
})

app.post('api/notes', (res, req) => {
    //add a new note to the db.json file and return new note to client
})

app.delete('/api/notes/:id', (res, req) =>{
    //delete notes, give each note a specific ID number 
})