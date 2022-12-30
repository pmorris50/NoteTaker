const express = require('express');
const path = require('path');
const fs = require('fs');
// const { clog } =require() //What is clog? why is it used?
const app = express();
const PORT = process.env.port || 3001;
//const { v4: uuidv4} = require('uuid');

const uuid = require('uuid');
console.log(`Here is a test v1 uuid: ${uuid.v1()}`); //use this one
console.log(`Here is a test v4 uuid: ${uuid.v4()}`);
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
    fs.readFile('db.json', 'utf8', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
   // res.json(//all saved notes)
})

app.post('api/notes', (res, req) => {
    const { noteTitle, noteBody} = req.body
    console.log(req.body);
    if(req.body){
        const newNote = {
            noteTitle,
            noteBody,
            noteID: uuidv1(), //giving a unique id to each note
        };
        readAndAppend(newNote, './db.json'); //where do I send the note?
        res.json('Note added succussfully');

    } else{
        res.error('error in submitting the note')
    }

    //add a new note to the db.json file and return new note to client
})

app.delete('/api/notes/:id', (res, req) =>{
    const notesID = req.params.id
    readFromFile('./db.json')
    .then((data) => JSON.parse(data))
    //delete notes, give each note a specific ID number 
})