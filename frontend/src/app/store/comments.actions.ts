import { createAction, props } from '@ngrx/store';
import { Comment, CommentData } from '../models/comment.model';

export const fetchCommentsRequest = createAction(
  '[Comments] Fetch Request',
  props<{id: string}>()
);
export const fetchCommentsSuccess = createAction(
  '[Comments] Fetch Success',
  props<{comments: Comment[]}>()
);
export const fetchCommentsFailure = createAction(
  '[Comments] Fetch Failure',
  props<{error: string}>()
);


export const createCommentsRequest = createAction(
  '[Comments] Create Request',
  props<{commentsData: CommentData, token: string}>()
);
export const createCommentsSuccess = createAction(
  '[Comments] Create Success'
);
export const createCommentsFailure = createAction(
  '[Comments] Create Failure',
  props<{error: string}>()
);
