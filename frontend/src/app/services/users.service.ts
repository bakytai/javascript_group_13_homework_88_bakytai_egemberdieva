import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUserData, RegisterUserData, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData) {
    return this.http.post<User>(environment.apiUrl + '/users', userData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  logout(token: string) {
    return this.http.delete(environment.apiUrl + '/users/sessions', {
      headers: new HttpHeaders({'Authorization': token})
    });
  }
}
