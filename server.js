//Import required packages 
const express = require("express");
const fs = require("fs");
const uuid = require("./helpers/uuid");

//Start the express server 
const app = express();
const PORT = 3001;

//Parse data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());