//Import required packages 
const express = require("express");
const fs = require("fs");
const path = require("path");
const { uuid } = require("./helpers/uuid");

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
    fs.readFileSync("./db/db.json", "utf8", (err, data) => {

        //If error exist, display the error 
        if (err) console.log(err);

        //Parsing the data to string and displaying it
        res.json(JSON.parse(data));

    });
});

//POST request to post the title and text to the page
app.post("/api/notes", (req, res) => {

    //Read the file of the db.json
    fs.readFileSync("./db/db.json", "utf8", (err, data) => {

        //If error exist, display the error
        if (err) console.log(err);

        //Convert string to object
        const note = JSON.parse(data);

        //Destructuring assignment for the items in req.body 
        const { title, text } = req.body;

        //If the title and text is present, then push the parseData to the object
        if (title && text) {

            //Object to save the response
            const newNote =  {
                ...req.body,
                id: uuid
            };

            //Push the data to the object
            note.push(newNote);
        };

        //Conver object to string to save it 
        const notes = JSON.stringify(note);

        //Write the file
        fs.writeFile("./db/db.json", notes, (err) => {
            
            //If error exist, display the error
            if (err) console.log(err);

            //Return the title and text as string
            res.json(notes);
        });
    }); 
});

//DELETE request to delete the note based on the id (BOUNS)
app.delete("./db/db.json", (req, res) => {

    //Read the file 
    fs.readFileSync("./db/db.json", (err, data) => {

        //If error exist, display the error 
        if (err) console.log(err);

        //Convert string to object 
        const note = JSON.parse(data);

        //Get the id of the specific notes 
        const deleteNote = req.params.id;

        //Filter through the array of object, and if id matches it will remove it 
        const loopNote = note.filter(notes => notes !== deleteNote);

        //Write the file 
        fs.writeFile("./db/db.json", JSON.stringify(loopNote), err => {

            //If error exist, display the error 
            if (err) console.log(err);

            //Display message that specific notes has been deleted 
            res.json("Successfully deleted notes");
        });
    });
});

//GET request for html route notes page 
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

//GET request for html route to home page 
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

//Listening to the port number 
app.listen(PORT, () => console.log(`Application listening to PORT http://localhost:${PORT}`));