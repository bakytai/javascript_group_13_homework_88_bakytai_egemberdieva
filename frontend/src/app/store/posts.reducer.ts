import { createReducer, on } from '@ngrx/store';
import {
  createPostsFailure,
  createPostsRequest,
  createPostsSuccess, fetchPostFailure, fetchPostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess, fetchPostSuccess
} from './posts.actions';
import { PostState } from './types';

const initialState: PostState = {
  posts: [],
  post: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true})),
  on(fetchPostsSuccess, (state, {posts}) => ({...state, fetchLoading: false, posts})),
  on(fetchPostsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(fetchPostRequest, state => ({...state, fetchLoading: true})),
  on(fetchPostSuccess, (state, {post}) => ({...state, fetchLoading: false, post})),
  on(fetchPostFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createPostsRequest, state => ({...state, createLoading: true})),
  on(createPostsSuccess, state => ({...state, createLoading: false})),
  on(createPostsFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),
)
