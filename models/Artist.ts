import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  information: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;