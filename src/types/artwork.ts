export interface Artwork {
  id: string;
  title?: string;
  image_id: string;
  description: string;
  artist: Artist;
}

export interface Artist {
  title?: string;
  sort_title: string;
  is_artist: boolean;
  birth_date?: string;
  death_date?: string;
  description?: string;
}
