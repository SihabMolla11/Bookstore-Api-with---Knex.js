export interface BookType {
  id: number;
  title: string;
  description?: string;
  published_date: string;
  author_id: number;
}

export interface BookUpdateType {
  title?: string;
  description?: string;
  published_date?: string;
  author_id?: number;
}
