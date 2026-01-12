import {patchState, signalStore, withHooks, withMethods, withProps, withState} from '@ngrx/signals';
import {effect, inject} from '@angular/core';
import {Firebase} from './firebase';
import {loginStore} from './login-store';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {Escape, EscapeAdd} from './models';
import {EscapesAdd} from '../escapes/escapes-add/escapes-add';

type EscapeState = {
  escapes: Escape[]
}

const initialState: EscapeState = {
  escapes: []
}

export const EscapeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps((store) => ({
    _firebaseService: inject(Firebase),
    _loginStore: inject(loginStore),
  })),
  withMethods(store => ({
    loadEscapes: rxMethod<string>(
      pipe(
        switchMap(s => store._firebaseService.loadEscapes(s)),
        tapResponse({
          next: escapes => patchState(store, {escapes}),
          error: e => console.error(e)
        })
      )
    ),
    saveEscape: rxMethod<{value: EscapeAdd,  onComplete: () => void  }>(
      pipe(
        switchMap(e => store._firebaseService.createEscape(e.value, store._loginStore.idToken()).pipe(
          tap(() => e.onComplete())
        )),
        tapResponse({
          next: () => {},
          error: e => console.error(e)
        })
      )
    )
  })),
  withHooks({
    onInit: store => {
      effect(() => {
        store._firebaseService.loadEscapes(store._loginStore.idToken()).subscribe(r => {
          patchState(store, {
            escapes: r
          })
        })
      });
    }
  })
)
