const express = require('express');
const path = require('path');
const fs = require('fs');
// const { clog } =require() //What is clog? why is it used?
const app = express();
const PORT = process.env.PORT || 3001;
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


//Get Route to return all saved notes as JSON to notes.html
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
  
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
            id: uuid.v4(), //giving a unique id to each note
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
        res.send(displayNote);
    }
    console.log(req.body)
  })



  app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
  
      const notes = JSON.parse(data).filter(note => note.id !== req.params.id);
    
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.send('Note successfully deleted');
      });
    });
  });


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, ()=> {
    console.log(`now listening on port ${PORT}`);
});

    