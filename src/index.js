const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require("bcrypt");

const breeds = require('./models/breeds');
const chats = require('./models/chats');
const favouriteMarkers = require('./models/favouriteMarkers');
const likes = require('./models/likes');
const markers = require('./models/markers');
const matches = require('./models/matches');
const messages = require('./models/messages');
const pets = require('./models/pets');
const roles = require('./models/roles');
const species = require('./models/species');
const config = require('./models/config');
const users = require('./models/users');
const language = require('./models/language');
const blogPost = require('./models/blogPost');

const email = require('./email/email');

// Configure environment variables
dotenv.config();

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

// Store the hostname and the port
const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;

// Define the CORS options
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionSuccessStatus: 200
};

// Create a new Express instance
const app = express()
    .use(cors(corsOptions))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(breeds(connection))
    .use(chats(connection))
    .use(favouriteMarkers(connection))
    .use(likes(connection))
    .use(markers(connection))
    .use(matches(connection))
    .use(messages(connection))
    .use(pets(connection))
    .use(roles(connection))
    .use(species(connection))
    .use(config(connection))
    .use(users(connection, bcrypt))
    .use(language(connection))
    .use(blogPost(connection))
    .use(email());

// Start listening
app.listen(port, hostname, () => {
    console.log(`Server is running at '${hostname}:${port}'`);
});