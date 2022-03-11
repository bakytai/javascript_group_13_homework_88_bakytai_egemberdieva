import { createAction, props } from '@ngrx/store';
import { Post, PostData } from '../models/post.model';

export const fetchPostsRequest = createAction('[Posts] Fetch Request');
export const fetchPostsSuccess = createAction(
  '[Posts] Fetch Success',
  props<{posts: Post[]}>()
);
export const fetchPostsFailure = createAction(
  '[Posts] Fetch Failure',
  props<{error: string}>()
);

export const fetchPostRequest = createAction(
  '[Post] Fetch Request',
  props<{id: string}>()
);
export const fetchPostSuccess = createAction(
  '[Post] Fetch Success',
  props<{post: Post}>()
);
export const fetchPostFailure = createAction(
  '[Post] Fetch Failure',
  props<{error: string}>()
);

export const createPostsRequest = createAction(
  '[Posts] Create Request',
  props<{postData: PostData, token: string}>()
);
export const createPostsSuccess = createAction(
  '[Posts] Create Success'
);
export const createPostsFailure = createAction(
  '[Posts] Create Failure',
  props<{error: string}>()
);
