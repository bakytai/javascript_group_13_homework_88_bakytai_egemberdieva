import { createReducer, on } from '@ngrx/store';
import {
  createCommentsFailure, createCommentsRequest, createCommentsSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';
import { CommentState } from './types';

const initialState: CommentState = {
  comments: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(fetchCommentsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCommentsSuccess, (state, {comments}) => ({...state, fetchLoading: false, comments})),
  on(fetchCommentsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createCommentsRequest, state => ({...state, createLoading: true})),
  on(createCommentsSuccess, state => ({...state, createLoading: false})),
  on(createCommentsFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),
)
