const dotenv = require('dotenv');
const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const compression = require("compression");

// Middlewares
const auth = require('./middleware/auth');

// DB Models
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

// Mail controller
const email = require('./email/email');

// Configure environment variables
dotenv.config();

// Store environment variables in an object to
// avoid crashes when trying to access them
const poolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    charset: process.env.DB_CHARSET,
    waitForConnections: true,
    connectionLimit: 10, // The maximum number of connections to create at once. (Default: 10)
    maxIdle: 3, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
}

// Create the connection pool. The pool-specific settings are the defaults
const connectionPool = mysql.createPool(poolConfig);

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
    .use(auth)
    .use(blogCategories(connectionPool))
    .use(blogComments(connectionPool))
    .use(blogCommentLikes(connectionPool))
    .use(blogPosts(connectionPool))
    .use(blogTags(connectionPool))
    .use(breeds(connectionPool))
    .use(chats(connectionPool))
    .use(config(connectionPool))
    .use(favouriteMarkers(connectionPool))
    .use(languages(connectionPool))
    .use(likes(connectionPool))
    .use(markers(connectionPool))
    .use(matches(connectionPool))
    .use(messages(connectionPool))
    .use(pets(connectionPool))
    .use(petPosts(connectionPool))
    .use(petPostComments(connectionPool))
    .use(petPostCommentLikes(connectionPool))
    .use(petPostLikes(connectionPool))
    .use(roles(connectionPool))
    .use(species(connectionPool))
    .use(users(connectionPool, bcrypt))
    .use(userReports(connectionPool))
    .use(email());

// Start listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});