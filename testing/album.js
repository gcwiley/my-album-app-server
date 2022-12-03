const express = require('express');
const Album = require('../models/album');
const auth = require('../middleware/auth');
// define a new router
const router = new express.Router();

// Route handler to create a new album - NEW ALBUM
router.post('/albums', async (req, res) => {
  const album = new Album({
    // copies all of the properties from the body to the object
    ...req.body,
    // adding on the owner property to create assocation
    owner: req.user._id,
  });

  try {
    await album.save();
    res.status(201).send(album);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route handler for fetching all albums - GET ALL ALBUMS
// sends back an array of data

// GET /albums?completed=false
// GET /albums?limit=10&skip=20
// GET /albums?sortBy=createdAt:desc
router.get('/albums', auth, async (req, res) => {
  const match = {};

  // create a empty sort object
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'albums',
        match: match,
        options: {
          // parseInt is a function provided by JS that allows us to parse a string that contains a number into a actual integer.
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: sort,
        },
      })
      .execPopulate();
    res.send(req.user.albums);
  } catch (error) {
    res.status(500).send();
  }
});

// Route handler to fetch individual album by ID
router.get('/albums/:id', async (req, res) => {
  const _id = req.params._id;

  try {
    // filters by _id and owner value
    const album = await Album.findOne({ _id, owner: req.user._id });

    if (!album) {
      return res.status(404).send();
    }

    res.send(album);
  } catch (error) {
    res.status(500).send();
  }
});

// Route handler to update an existing album - UDPATE ALBUM
router.patch('/albums/:id', async (req, res) => {
  // Error handling - make sure the user is running the operation correctly
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    // finds album that takes owner into account
    const album = await Album.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // if no album to update with that ID
    if (!album) {
      return res.status(404).send();
    }

    updates.forEach((update) => (album[update] = req.body[update]));

    await album.save();
    // success - send update album back
    res.send(album);
  } catch (error) {
    // if something goes wrong - like a validation issue
    res.status(400).send(error);
  }
});

// Route handler to delete a album by ID
router.delete('/albums/:id', auth, async (req, res) => {
  try {
    // finds and delete album that takes owner into account
    const album = await Album.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!album) {
      res.status(404).send();
    }

    res.send(album);
  } catch (error) {
    res.status(500).send();
  }
});

// export the router to be used
module.exports = router;
