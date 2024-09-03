import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import {AlbumWithoutId} from '../types';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const albums = await Album.find(artistId ? ({artist: artistId}) : ({}));
    return res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: AlbumWithoutId = {
      artist: req.body.artist,
      title: req.body.title,
      year: req.body.year,
      image: req.file ? req.file.filename : null,
    };

    const album = new Album(albumData);
    await album.save();

    return res.send(album);
  } catch (error) {
    if(error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist', 'name information image');

    if(album === null) {
      return res.status(404).send({error: 'Album not found'});
    }

    return res.send(album);
  } catch (error) {
    next(error);
  }
});

export default albumsRouter;