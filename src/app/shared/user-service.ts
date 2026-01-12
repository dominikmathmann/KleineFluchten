import {effect, inject, Injectable, signal} from '@angular/core';
import {tap} from 'rxjs';
import {Firebase} from './firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  static readonly REFRESH_TOKEN_KEY = "ddkf-refresh";

  idToken = signal<string>('');
  #refreshToken = signal<string>('');

  #firebaseService = inject(Firebase);

  constructor() {
    effect(() => {
      localStorage.setItem(UserService.REFRESH_TOKEN_KEY, this.#refreshToken());
    });

    this.#initStateFromLocalStorage();
  }

  #initStateFromLocalStorage() {
    const refreshTokenLS = localStorage.getItem(UserService.REFRESH_TOKEN_KEY);

    let idToken = '';
    let refreshToken = '';
    if (refreshTokenLS) {
      this.#firebaseService.refresh(refreshTokenLS).subscribe(r => {
        idToken = r.id_token || r.idToken;
        refreshToken = r.refresh_token || r.refreshToken;
        this.idToken.set(idToken);
        this.#refreshToken.set(refreshToken);
      })
    }
  }

  login(username: string, password: string) {
    return this.#firebaseService.login(username, password).pipe(
      tap(r => {
        const idToken = r.id_token || r.idToken;
        const refreshToken = r.refresh_token || r.refreshToken;

        this.idToken.set(idToken);
        this.#refreshToken.set(refreshToken);
      })
    )
  }
}
