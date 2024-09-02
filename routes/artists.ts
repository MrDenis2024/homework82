import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import {ArtistWithoutId} from '../types';
import {imagesUpload} from '../multer';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (error) {
    next(error);
  }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const artistData: ArtistWithoutId = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      information: req.body.information ? req.body.information : null,
    };

    const artist = new Artist(artistData);
    await artist.save();

    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default artistsRouter;