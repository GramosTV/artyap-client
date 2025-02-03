export interface Comment {
  id: number;
  artwork: number;
  user: { username: string };
  parent?: number;
  text: string;
  created_at: string;
  replies: Comment[];
}
