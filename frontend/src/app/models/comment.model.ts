export class Comment {
  constructor(
    public id: string,
    public user: string,
    public text: string,
  ) {}
}

export interface CommentData {
  post: string;
  text: string;
}

export interface ApiCommentData {
  _id: string,
  user: string,
  post: string,
  text: string,
}
