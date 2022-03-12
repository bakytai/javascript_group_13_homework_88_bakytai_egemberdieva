import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiCommentData, Comment, CommentData } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(id: string) {
    return this.http.get<ApiCommentData[]>(environment.apiUrl + '/comments?post=' + id).pipe(
      map(response => {
        return response.map(commentData => {
          return new Comment(commentData._id, commentData.user, commentData.text)
        });
      })
    );
  };


  createComments(commentData: CommentData, token: string) {
    return this.http.post(environment.apiUrl + '/comments', commentData, {
      headers: new HttpHeaders({'Authorization': token}),
    });
  }
}
