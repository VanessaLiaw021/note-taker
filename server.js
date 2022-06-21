//Import required packages 
const express = require("express");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const path = require("path");
const { parse } = require("path");

//Start the express server 
const app = express();
const PORT = 3001;

//Express server to read from public directory
app.use(express.static('public'));

//Parse data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET request to read all note in db.json and display it on the notes page 
app.get("/api/notes", (req, res) => {

    //Read the file from db.json 
    fs.readFile("./db/db.json", "utf8", (err, data) => {

        //If error exist, display the error 
        if (err) console.log(err);

        //Parsing the data to string and displaying it
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
        const parseNote = JSON.parse(data);

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
            parseNote.push(newNote);
        };

        //Conver object to string to save it 
        const parseNoteAgain = JSON.stringify(parseNote);

        //Write the file
        fs.writeFile('./db/db.json', parseNoteAgain, (err, data) => {
            
            //If error exist, display the error
            if (err) console.log(err);

            //Return the title and text as string
            res.json(parseNoteAgain);
        });
    }); 
});

//GET request for html route notes page 
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

//GET request for html route to home page 
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

//Listening to the port number 
app.listen(PORT, () => console.log(`Application listening to PORT http://localhost:${PORT}`));