import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [Eminem, ACDC] = await Artist.create({
    name: 'Eminem',
    image: 'fixtures/Eminem.jpeg',
    information: 'Ма́ршалл Брюс Мэ́терс III (англ. Marshall Bruce Mathers III; род. 17 октября 1972, Сент-Джозеф, Миссури, США), более известный под псевдонимом Эминем (англ. Eminem, стилизовано как EMINƎM)',
  }, {
    name: 'AC/DC',
    image: 'fixtures/ACDC.jpeg',
    information: 'AC/DC (Эй-си/ди-си; сокращённо от англ. alternating current/direct current «переменный ток/постоянный ток») — австралийская рок-группа, сформированная в Сиднее в ноябре 1973 года выходцами из Шотландии, братьями Малькольмом и Ангусом Янгами',
  });

  const [encore, highway, back] = await Album.create({
    title: 'Encore',
    artist: Eminem,
    year: '2004',
    image: 'fixtures/Encore.jpg',
  }, {
    title: 'Highway to Hell',
    artist: ACDC,
    year: '1979',
    image: 'fixtures/Highway.jpeg',
  }, {
    title: 'Back in Black',
    artist: ACDC,
    year: '1980',
    image: 'fixtures/back.jpeg',
  });

  await Track.create({
    name: 'Mockingbird',
    album: encore,
    duration: '4:11',
  }, {
    name: 'Highway to Hell',
    album: highway,
    duration: '3:28',
  }, {
    name: 'Back in Black',
    album: back,
    duration: '4:16',
  });

  await db.close();
};

run().catch(console.error);