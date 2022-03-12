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
  userSub!: Subscription;
  post: Observable<null | Post>;
  postSub!: Subscription;
  token!: string;
  userO!: User;
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
  }
  ngOnInit(): void {
    this.store.dispatch(fetchPostRequest({id: this.route.snapshot.params['id']}));
    this.store.dispatch(fetchCommentsRequest({id: this.route.snapshot.params['id']}));
    this.userSub = this.user.subscribe(user => {

      if (user) {

        console.log({user})
      } else {
        this.token = '';
      }
    });
    this.postSub = this.post.subscribe(post => {
      if (post) {
        console.log(post)
        this.postInfo = post;
      } else {
        this.postInfo = null;
      }
    });
  }
  onSubmit() {
    const commentData: CommentData = {
      text: this.form.form.value.text,
      post: this.route.snapshot.params['id'],
    }
    const token = this.token;
    this.store.dispatch(createCommentsRequest({commentData, token}));
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
