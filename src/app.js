import path from 'path';
import process from 'process';
import express from 'express';
import logger from 'morgan';
import { initializeApp } from 'firebase-admin/app';
import * as dotenv from 'dotenv';

// load environment variables
dotenv.config();

const __dirname = path.resolve();

// Initialize the Firebase SDK
initializeApp();

// Import Routes
import albumRouter from './routes/album.js';

// create express app by executing express package
const app = express();

// set the port
const port = process.env.PORT || 8080;

// allows static access to the angular folder
app.use('/', express.static(path.join(__dirname, 'dist/my-album-app-client')));

// automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creates the logger middleware
app.use(logger('dev'));

// register the routers
app.use(albumRouter);

// handle all other routes with angular app - returns angular app
app.use((req, res) => {
  // send back the angular index.html file
  res.sendFile(path.join(__dirname, './dist/..', 'index.html'));
});

app.listen(port, () => {
  console.log('Successfully started server');
});
