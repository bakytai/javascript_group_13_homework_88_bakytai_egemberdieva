import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostData } from '../models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { createPostsRequest } from '../store/posts.actions';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent {
  @ViewChild('f') form!: NgForm;
  user: Observable<null | User>;
  userObj!: User;
  token!: string;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.userObj = <User>user;
    })
  }


  onSubmit() {
    const postData = this.form.value;
    const post: PostData = {
      title: postData.title,
      description: postData.description,
      image: postData.image,
      user: {
        _id: this.userObj._id,
        email: this.userObj.email,
        displayName: this.userObj.displayName,
        token: this.userObj.token
      }
    }
    this.store.dispatch(createPostsRequest({postData: post}));
  }

}
