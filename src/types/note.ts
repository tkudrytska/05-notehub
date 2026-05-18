export interface Note {
  id: string;
  title: string;
  content: string;
  tags: NoteTag[];
}

export interface NoteTag {
  id: string;
  name: string;
}
