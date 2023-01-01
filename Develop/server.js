const express = require('express');
const path = require('path');
const fs = require('fs');
// const { clog } =require() //What is clog? why is it used?
const app = express();
const PORT = process.env.port || 3001;
const { v4: uuidv4} = require('uuid');

const uuid = require('uuid');
const { stringify } = require('querystring');
console.log(`Here is a test v1 uuid: ${uuid.v1()}`); //use this one
console.log(`Here is a test v4 uuid: ${uuid.v4()}`);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


//GET for Home Page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//GET route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// GET Route to send back to home page 


//Get Route to return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
   // res.json(//all saved notes)
})
//const db = require("./db/db.json")
// console.log(db)
// db.push("hello")
// console.log(db)
app.post('/api/notes', (req, res) => {
    const { title, text} = req.body
    const dbCopy = require('./db/db.json');
    console.log(req.body);
    if(req.body){
        const newNote = {
            title,
            text,
            noteID: uuid.v4(), //giving a unique id to each note
        };
        dbCopy.push(newNote)
        const data = JSON.stringify(dbCopy)
       fs.writeFile('./db/db.json', data , (err) => {
        if(err){
            throw err;
        } else{
            console.log('The file has been saved');
            res.json('Note added succussfully');
        }
       })
    }});


  //display note on right side when clicked
  app.get('/api/notes/:id', (req, res) =>{
    const {title, text} = req.body
    const dbCopy = require('./db/db.json')
    if(req.body){
        const displayNote = {
            title, 
            text
        } 
    }
    console.log(req.body)
    res.send(displayNote);
  })

    //add a new note to the db.json file and return new note to client


app.delete('/api/notes/:id', (req, res) => {
    const notesCopy = require('./db/db.json');
   //const data = JSON.parse(notesCopy)
    const notes = notesCopy.filter(noteCopy => noteCopy.noteID !== req.params.id);
    const dnotes = JSON.stringify(notes)
  
    fs.writeFile('./db/db.json', dnotes, (err) => {
      if (err) throw err;
      res.send('Note successfully deleted');
    });
  });
// app.delete('/api/notes/:id', (req, res) =>{
//     const notesCopy = require('./db/db.json')
//     notesIDs = []
//     notesCopy.filter(notesCopy.noteID)
    
//     // const notesID = req.params.id
//     // readFromFile('./db.json')
//     // .then((data) => JSON.parse(data))
//     //delete notes, give each note a specific ID number 
// })






// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// })


app.listen(PORT, ()=> {
    console.log(`now listening on port ${PORT}`);
});

    