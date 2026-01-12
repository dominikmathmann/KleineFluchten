import {patchState, signalStore, withHooks, withMethods, withProps, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {Firebase} from './firebase';

const REFRESH_TOKEN_KEY = "ddkf-refresh";

type LoginState = {
  idToken: string,
  _refreshToken: string
}

const initialState: LoginState = {
  idToken: '',
  _refreshToken: '',
}

export const loginStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    firebaseService: inject(Firebase)
  })),
  withHooks({
    onInit: (store) => {
      const refreshTokenLS = localStorage.getItem(REFRESH_TOKEN_KEY);

      let idToken = '';
      let refreshToken = '';
      if(refreshTokenLS) {
        store.firebaseService.refresh(refreshTokenLS).subscribe(r => {
          idToken = r.id_token || r.idToken;
          refreshToken = r.refresh_token || r.refreshToken;

          patchState(store, {
            idToken,
            _refreshToken: refreshToken
          })
        })
      } else {
        // TODO
        store.firebaseService.login('', '').subscribe(r => {
          idToken = r.id_token || r.idToken;
          refreshToken = r.refresh_token || r.refreshToken;

          patchState(store, {
            idToken,
            _refreshToken: refreshToken
          })
        })
      }
    }
  })
);
