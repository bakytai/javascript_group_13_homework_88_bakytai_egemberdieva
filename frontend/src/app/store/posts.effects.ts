import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import {
  createPostsFailure,
  createPostsRequest,
  createPostsSuccess,
  fetchPostFailure,
  fetchPostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostSuccess
} from './posts.actions';
import { PostService } from '../services/posts.service';

@Injectable()

export class PostsEffects {
  fetchPosts = createEffect(() => this.actions.pipe(
    ofType(fetchPostsRequest),
    mergeMap(() => this.postsService.getPost().pipe(
      map(posts => fetchPostsSuccess({posts})),
      catchError(() => of(fetchPostsFailure({error: 'Something went wrong'})))
    ))
  ));

  fetchPost = createEffect(() => this.actions.pipe(
    ofType(fetchPostRequest),
    mergeMap(({id}) => this.postsService.getPostInfo(id).pipe(
      map(post => fetchPostSuccess({post})),
      catchError(() => of(fetchPostFailure({error: 'Something went wrong'})))
    ))
  ));

  createPost = createEffect(() => this.actions.pipe(
    ofType(createPostsRequest),
    mergeMap(({postData}) => this.postsService.createPost(postData).pipe(
      map(post => createPostsSuccess({post})),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPostsFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private postsService: PostService
  ) {}
}
