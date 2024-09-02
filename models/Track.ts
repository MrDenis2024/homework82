import mongoose, {Types} from 'mongoose';
import Album from './Album';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist',
    },
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;