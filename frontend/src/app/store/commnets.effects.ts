import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CommentsService } from '../services/comments.service';
import {
  createCommentsFailure,
  createCommentsRequest,
  createCommentsSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';

@Injectable()

export class CommentsEffects {
  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(({id}) => this.commentsService.getComments(id).pipe(
      map(comments => fetchCommentsSuccess({comments})),
      catchError(() => of(fetchCommentsFailure({error: 'Something went wrong'})))
    ))
  ));

  createComments = createEffect(() => this.actions.pipe(
    ofType(createCommentsRequest),
    mergeMap(({commentData}) => this.commentsService.createComments(commentData).pipe(
      map(() => createCommentsSuccess()),
      catchError(() => of(createCommentsFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private commentsService: CommentsService
  ) {}
}
