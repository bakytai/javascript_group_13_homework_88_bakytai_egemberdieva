export class Post {
  constructor(
    public id: string,
    public user: string,
    public date: string,
    public title: string,
    public description: string,
    public image: string,
  ) {}
}

export interface PostData {
  [key: string]: any;
  title: string;
  description: string;
  image: File | null;
}

export interface ApiPostData {
  _id: string,
  user: string,
  date: string,
  title: string,
  description: string,
  image: string
}
