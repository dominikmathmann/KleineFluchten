import {inject, Injectable, resource, ResourceRef, signal} from '@angular/core';
import {Escape, EscapeAdd} from './models';
import {Firebase} from './firebase';
import {UserService} from './user-service';
import {catchError, firstValueFrom, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscapesService {

  escapeResource: ResourceRef<Escape[] | undefined> = resource({
    params: () => ({token: this.#userService.idToken()}),
    loader: ({params}) => firstValueFrom(this.#firebaseService.loadEscapes(params.token).pipe(
      catchError(e => of([]))
    )),
  });

  #firebaseService = inject(Firebase);
  #userService = inject(UserService);

  saveEscape(escape: EscapeAdd){
    return this.#firebaseService.createEscape(escape,this.#userService.idToken())
  }

  loadEscape(escapeId: () => string){
    return resource({
      params: () => escapeId(),
      loader: ({params}) => firstValueFrom(of(params))
    })
  }

  vote(id: string, voting: number){
    return this.#firebaseService.updateEscape("voting", id, voting, 'integerValue', this.#userService.idToken());
  }
}
