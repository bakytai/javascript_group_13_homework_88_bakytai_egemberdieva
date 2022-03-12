import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Comment, CommentData } from '../../models/comment.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/types';
import { Post } from '../../models/post.model';
import { fetchPostRequest } from '../../store/posts.actions';
import { createCommentsRequest, fetchCommentsRequest } from '../../store/comments.actions';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit , OnDestroy{
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user: Observable<null | User>;
  post: Observable<null | Post>;
  postSub!: Subscription;
  token!: string;
  userObj!: User;
  postInfo!: Post | null;
  comments: Observable<Comment[]>
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.comments = store.select(state => state.comments.comments);
    this.loading = store.select(state => state.comments.fetchLoading);
    this.error = store.select(state => state.comments.fetchError);
    this.user = store.select(state => state.users.user);
    this.post = store.select(state => state.posts.post);
    this.user.subscribe(user => {
      this.userObj = <User>user
    })
  }
  ngOnInit(): void {
    this.store.dispatch(fetchPostRequest({id: this.route.snapshot.params['id']}));
    this.store.dispatch(fetchCommentsRequest({id: this.route.snapshot.params['id']}));
    this.postSub = this.post.subscribe(post => {
      if (post) {
        this.postInfo = post;
      } else {
        this.postInfo = null;
      }
    });
  }


  onSubmit() {
    const comment: CommentData = {
      text: this.form.form.value.text,
      post: this.route.snapshot.params['id'],
      user: {
        _id: this.userObj._id,
        email: this.userObj.email,
        displayName: this.userObj.displayName,
        token: this.userObj.token
      }
    }

    this.store.dispatch(createCommentsRequest({commentData: comment}));
    this.store.dispatch(fetchCommentsRequest({id: this.route.snapshot.params['id']}));
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
