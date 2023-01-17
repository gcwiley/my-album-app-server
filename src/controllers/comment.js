import { Comment } from '../models/comment.js';

// function to create a new album - NEW COMMENT
export const newComment = async (req, res) => {
  const comment = Comment.build(req.body);

  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
};

// function to fetch all comments from database - ALL COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();

    // if no comments are found in db
    if (!comments) {
      return res.status(404).send();
    }

    res.send(comments);
  } catch (error) {
    res.status(500).send();
  }
};

// function to delete comment by id - DELETE COMMENT
export const deleteCommentById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const comment = await Comment.destroy({
      where: {
        id: id,
      },
    });

    // if no comment if found to delete
    if (!comment) {
      res.status(404).send();
    }

    res.send(comment);
  } catch (error) {
    res.status(500).send();
  }
};
