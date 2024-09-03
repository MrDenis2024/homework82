export interface ArtistWithoutId {
  name: string;
  image: string | null;
  information: string | null;
}

export interface AlbumWithoutId {
  artist: string;
  title: string;
  year: string;
  image: string | null;
}

export interface TrackWithoutId {
  album: string;
  name: string;
  duration: string;
}