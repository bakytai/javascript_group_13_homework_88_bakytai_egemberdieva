import { Post } from '../models/post.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Comment } from '../models/comment.model';

export type PostState = {
  posts: Post[],
  post: Post | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type CommentState = {
  comments: Comment[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError
}

export type AppState = {
  posts: PostState,
  comments: CommentState,
  users: UserState,
}
