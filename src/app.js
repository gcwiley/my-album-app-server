import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import express from 'express';
import logger from 'morgan';
import { applicationDefault, initializeApp } from 'firebase-admin/app';

// get the current file name
const __filename = fileURLToPath(import.meta.url);

// get the current directory name
const __dirname = path.dirname(__filename);

// import sequelize instance
import { sequelize } from './db/db.js';

// Initialize the Firebase SDK
initializeApp({
  credential: applicationDefault(),
});

// Import Routes
import albumRouter from './routes/album.js';

// create express app by executing express package
const app = express();

// set the port for the application
const PORT = process.env.PORT || 3000;

// allows static access to the angular folder
app.use('/', express.static(path.join(__dirname, '/dist/my-album-app-client')));

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
  res.sendFile(path.join(__dirname, './dist/my-album-app-client', 'index.html'));
});

// synchronize all models
await sequelize.sync();
console.log('All models were synchronized successfully');

// start the server
app.listen(PORT, () => {
  console.log(`Successfully started server on port ${PORT}`);
});
