import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiPostData, Post, PostData } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPost() {
    return this.http.get<ApiPostData[]>(environment.apiUrl + '/posts').pipe(
      map(response => {
        return response.map(postData => {
          return new Post(postData._id, postData.user, postData.date, postData.title, postData.description,
            postData.image
          );
        });
      })
    );
  };

  getPostInfo(id: string) {
    return this.http.get<ApiPostData>(environment.apiUrl + `/posts/${id}`).pipe(
      map(postData => {
        return new Post(postData._id, postData.user, postData.date, postData.title, postData.description,
          postData.image)
      })
    );
  };


  createPost(postData: PostData, token: string) {
    const formData = new FormData();

    Object.keys(postData).forEach(key => {
      if (postData[key] !== null) {
        formData.append(key, postData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/posts', formData, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }
}
