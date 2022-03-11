import { User } from './user.model';

export class Comment {
  constructor(
    public id: string,
    public user: User,
    public text: string,
  ) {}
}

export interface CommentData {
  post: string;
  text: string;
}

export interface ApiCommentData {
  _id: string,
  user: User,
  post: string,
  text: string,
}
