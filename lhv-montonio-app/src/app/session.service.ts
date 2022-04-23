import { Injectable } from '@angular/core';
import User from './User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User | null = null;

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') ?? '{}');
  }

  clear() {
    sessionStorage.clear();
  }
}
