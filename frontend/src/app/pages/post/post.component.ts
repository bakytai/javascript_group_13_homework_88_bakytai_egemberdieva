import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/types';
import { Post } from '../../models/post.model';
import { fetchPostRequest } from '../../store/posts.actions';
import { fetchCommentsRequest } from '../../store/comments.actions';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit , OnDestroy{
  @ViewChild('f') form!: NgForm;
  comments: Observable<Comment[]>;
  post: Observable<Post | null>;
  postInfo!: Post;
  postSubscription!: Subscription;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  user: Observable<null | User>;
  userSub!: Subscription;
  postId!: string;
  token!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.post = store.select(state => state.posts.post);
    this.comments = store.select(state => state.comments.comments);
    this.loading = store.select(state => state.comments.fetchLoading);
    this.error = store.select(state => state.comments.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id']
    })
    this.store.dispatch(fetchPostRequest({id: this.postId}));
    this.store.dispatch(fetchCommentsRequest({id: this.postId}));

    this.postSubscription = this.post.subscribe(post => {
      if (post) {
        this.postInfo = post;
      }
    });

    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.token = user.token;
      } else {
        this.token = '';
      }
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.userSub.unsubscribe();
  }

  onSubmit() {

  }
}
