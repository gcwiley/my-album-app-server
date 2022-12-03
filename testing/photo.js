import { extname } from 'path';
import { v4 as uuid } from 'uuid';

// Route handler to upload a new Photo - NEW PHOTO
export async function uploadPhoto(req, res) {
  try {
    // getting the user
    const user = req.user;
    // get the title of the photo
    const { title } = req.body;
    // get the extension of the file
    const fileExtenstion = extname(req.files.file.name);
    // create new file name
    const newFileName = uuid() + fileExtenstion;
    // copy file into uploads folder
    req.files.file.mv('src/uploads/' + newFileName);
    res.status(200).json({ message: 'Photo uploaded!' });
  } catch (error) {
    res.status(500).send();
  }
}
