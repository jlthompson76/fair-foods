const express = require('express');
const body_parser = require('body-parser');
const mongodb = require('mongodb');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

let db_handler;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

app.listen(PORT, () => {
    console.log(`Fair Foods is listening on port ${PORT}!`);

    let mongo_client = mongodb.MongoClient;
    mongo_client.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db_client) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log('Database Connected');
            db_handler = db_client.db(DB_NAME);
        }
    });
});
