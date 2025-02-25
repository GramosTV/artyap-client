export interface Artwork {
  id: string;
  title?: string;
  image_id: string;
  description: string;
  artist: Artist;
  material_titles: string;
  technique_titles: string;
  theme_titles: string;
  section_titles: string;
  place_of_origin: string;
  date_start: number;
  date_end: number;
}

export interface Artist {
  title?: string;
  sort_title: string;
  is_artist: boolean;
  birth_date?: string;
  death_date?: string;
  description?: string;
}

export interface TrendingArtwork {
  id: string;
  width: number;
  height: number;
  image_id: string;
  image: string;
}
