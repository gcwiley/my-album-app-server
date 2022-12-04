// Import the Album model
import { Album } from '../models/album.js';

// functin to create a new album - NEW ALBUM
export const newAlbum = async (req, res) => {
  const album = Album.build(req.body);

  try {
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    res.status(400).send(error);
  }
};

// function to fetch all albums from database - ALL ALBUMS
export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();

    if (!albums) {
      return res.status(404).send();
    }

    res.send(albums);
  } catch (error) {
    res.status(500).send();
  }
};

// function to fetch invidual album by id = ALBUM BY ID
export const getAlbumById = async (req, res) => {
  // converts id string to integer
  const id = parseInt(req.params.id);

  try {
    const album = await Album.findByPk(id);

    if (!album) {
      return res.status(404).send();
    }

    res.send(album);
  } catch (error) {
    res.status(500).send();
  }
};

// function to update album by id - UPDATE ALBUM
export const updateAlbumById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const album = await Album.update(req.body, {
      where: {
        id: id,
      },
    });

    if (!album) {
      res.status(404).send();
    }

    res.send(album);
  } catch (error) {
    res.status(500).send();
  }
};

// function to delete album by id - DELETE ALBUM
export const deleteAlbumById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const album = await Album.destroy({
      where: {
        id: id,
      },
    });

    if (!album) {
      res.status(404).send();
    }

    res.send(album);
  } catch (error) {
    res.status(500).send();
  }
};
