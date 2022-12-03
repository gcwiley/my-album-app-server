// this is a command line Utility script that converts JS into JSON and writes to a file

// Import file system (fs) package from node
import fs from 'fs';

// import albums from data
import { albums } from './album-data.js';

// the name of the file that is created
const FILE_NAME = 'albums.json';

fs.writeFileSync(FILE_NAME, JSON.stringify(albums), 'utf-8');

// when the script in done running
console.log('Done!');
