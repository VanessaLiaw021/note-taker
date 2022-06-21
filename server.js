//Import required packages 
const express = require("express");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const path = require("path");

//Start the express server 
const app = express();
const PORT = 3001;

//Express server to read from public directory
app.use(express.static('public'));

//Parse data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET request for html route notes page 
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

//GET request for html route to home page 
app.get("*", (req, res) => res.sendFile(path_join(__dirname, "public/index.html")));

//Listening to the port number 
app.listen(PORT, () => console.log(`Application listening to PORT http://localhost:${PORT}`));