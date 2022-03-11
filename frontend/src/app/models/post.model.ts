import { User } from './user.model';

export class Post {
  constructor(
    public id: string,
    public user: User,
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
  user: User,
  date: string,
  title: string,
  description: string,
  image: string
}
