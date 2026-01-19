import {inject, Injectable, resource} from '@angular/core';
import {Firebase} from './firebase';
import {catchError, firstValueFrom, of} from 'rxjs';
import {UserService} from './user-service';
import {TrackAdd} from './models';

@Injectable({
  providedIn: 'root',
})
export class TracksService {

  #firebaseService = inject(Firebase);
  #userService = inject(UserService);

  trackResource = resource({
    params: () => this.#userService.idToken(),
    loader: ({params}) => firstValueFrom(this.#firebaseService.loadTracks(params).pipe(
      catchError(e => of([]))
    ))
  })

  saveTrack(track: TrackAdd) {
    return this.#firebaseService.createTrack(track, this.#userService.idToken())
  }
}
