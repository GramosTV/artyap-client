export interface Comment {
  id: number;
  artwork: number;
  user: number;
  parent?: number;
  text: string;
  created_at: string;
}
