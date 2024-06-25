const dotenv = require('dotenv');
const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const compression = require("compression");

const blogCategories = require('./models/blogCategories');
const blogComments = require('./models/blogComments');
const blogCommentLikes = require('./models/blogCommentLikes');
const blogPosts = require('./models/blogPosts');
const blogTags = require('./models/blogTags');
const breeds = require('./models/breeds');
const chats = require('./models/chats');
const config = require('./models/config');
const favouriteMarkers = require('./models/favouriteMarkers');
const languages = require('./models/languages');
const likes = require('./models/likes');
const markers = require('./models/markers');
const matches = require('./models/matches');
const messages = require('./models/messages');
const pets = require('./models/pets');
const petPosts = require('./models/petPosts');
const petPostComments = require('./models/petPostComments');
const petPostCommentLikes = require('./models/petPostCommentLikes');
const petPostLikes = require('./models/petPostLikes');
const roles = require('./models/roles');
const species = require('./models/species');
const users = require('./models/users');
const userReports = require('./models/userReports');

const email = require('./email/email');

// Configure environment variables
dotenv.config();

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    charset: process.env.DB_CHARSET,
});

connection.connect();

// Store the the port
const port = process.env.PORT || 8080;

// Define the CORS options
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionSuccessStatus: 200
};

// Create a new Express instance
const app = express()
    .use(compression())
    .use(cors(corsOptions))
    .use(express.urlencoded({ extended: false, limit: "100mb" }))
    .use(express.json({ limit: "100mb" }))
    .use(morgan("dev"))
    .use(blogCategories(connection))
    .use(blogComments(connection))
    .use(blogCommentLikes(connection))
    .use(blogPosts(connection))
    .use(blogTags(connection))
    .use(breeds(connection))
    .use(chats(connection))
    .use(config(connection))
    .use(favouriteMarkers(connection))
    .use(languages(connection))
    .use(likes(connection))
    .use(markers(connection))
    .use(matches(connection))
    .use(messages(connection))
    .use(pets(connection))
    .use(petPosts(connection))
    .use(petPostComments(connection))
    .use(petPostCommentLikes(connection))
    .use(petPostLikes(connection))
    .use(roles(connection))
    .use(species(connection))
    .use(users(connection, bcrypt))
    .use(userReports(connection))
    .use(email());

// Start listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});