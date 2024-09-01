import express from "express";
import mongoose from 'mongoose';
import config from './config';
import artistsRouter from './routes/artists';
import albumsRouter from './routes/albums';
import tracksRouter from './routes/tracks';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);