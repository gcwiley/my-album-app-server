import { Router } from 'express';

// Define a new router
const router = new Router();

import {
  newAlbum,
  getAlbums,
  getAlbumById,
  updateAlbumById,
  deleteAlbumById,
} from '../controllers/album.js';

// Route handler to create a new album - NEW ALBUM
router.post('/api/albums', newAlbum);

// Route handler for fetching all albums - GET ALL ALBUMS
router.get('/api/albums', getAlbums);

// Route handler to fetch individual albums by ID
router.get('/api/albums/:id', getAlbumById);

// Route handle to update an existing album - UPDATE ALBUM
router.patch('/api/albums/:id', updateAlbumById);

// Route handle to delete an album by ID - DELETE ALBUM
router.delete('/api/albums/:id', deleteAlbumById);

// export the router to be used.
export default router;
