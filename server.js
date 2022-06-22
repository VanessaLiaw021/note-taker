//Import required packages
const express = require('express');
const uuid = require("./helpers/uuid");
const fs = require('fs');
const path = require('path');

//Start the express server
const app = express();
const PORT =  process.env.PORT || 3001;

//Parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Express server to read from public directory
app.use(express.static('public'));

//GET request for to read the db.json and display it all on the page
app.get("/api/notes", (req, res) => {

    //Read the file from db.json 
    fs.readFile("./db/db.json", "utf8", (err, data) => {

        //If error exist, throw an error
        if (err) console.log(err);

        //Parsing the data to string
        res.json(JSON.parse(data));
    });
}); 

//POST request to post the title and text to the page
app.post("/api/notes", (req, res) => {

    //Read the file of the db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Convert string to object
        const note = JSON.parse(data);

        //Destructuring assignment for the items in req.body 
        const {title, text} = req.body;

        //If the title and text is present, then push the parseData to the object
        if (title && text) {

            //Object to save the response
            const newNote =  {
                title, 
                text, 
                id: uuid()
            };

            //Push the data to the object
            note.push(newNote);
        };

        //Conver object to string to save it 
        const notes = JSON.stringify(note);

        //Write the file
        fs.writeFile('./db/db.json', notes, (err, data) => {
            
            //If error exist, display the error
            if (err) console.log(err);

            //Return the title and text as string
            res.json(notes);
        });
    }); 
});

//DELETE request to delete the id of that specific note
app.delete("/api/notes/:id", (req, res) => {

    //Read the file of the db.json
    fs.readFile("./db/db.json", (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Convert string to object
        const parseNote = JSON.parse(data);

        //Get the id of the specific notes
        const deleteNote = req.params.id;

        //Filter through the array of object, and if id matches, it will remove it
        const loopData = parseNote.filter(note => note.id !== deleteNote);

        //Write the file
        fs.writeFile('./db/db.json', JSON.stringify(loopData), (err, data) => {

             //If error exist, display the error
            if (err) console.log(err);

            //Display message that specific note is deleted
            res.json("Successfully Deleted");
        });
    }); 
});

//GET request for html route to notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

//GET request for html route to home page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));  

//Listening to the port server
app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));