import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TOKEN } from '../constants/app.constant';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthetication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {
    const isLoggedIn = this.fetchToken(TOKEN.CURRENT_TOKEN);
    if (isLoggedIn) {
      this.updateToken(true);
    } else {
      this.updateToken(false);
    }
  }

  private updateToken(status: boolean) {
    this.isAuthetication.next(status);
  }

  fetchToken(token: string) {
    return localStorage.getItem(token);
  }

  removeToken(token: string) {
    localStorage.removeItem(token);
    this.updateToken(false);
  }

  storeToken(token: string, data: any) {
    localStorage.setItem(token, data);
    this.updateToken(true);
  }
}
