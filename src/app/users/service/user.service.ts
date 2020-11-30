import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public async registerUser(userData: User): Promise<User> {
    if (!userData) {
      return;
    }

    let user = null;

    try {
      user = await this.http
        .post<User>(environment.apiUrl + 'user-register/', userData)
        .toPromise();
    } catch (error) {
      console.error('error: ', error);
      return error;
    }
    return user;
  }
}
