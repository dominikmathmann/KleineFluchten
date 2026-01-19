import {inject, Injectable, resource} from '@angular/core';
import {Firebase} from './firebase';
import {catchError, firstValueFrom, of} from 'rxjs';
import {UserService} from './user-service';

@Injectable({
  providedIn: 'root',
})
export class TracksService {

  firebase = inject(Firebase);
  userService = inject(UserService);

  trackResource = resource({
    params: () => this.userService.idToken(),
    loader: ({params}) => firstValueFrom(this.firebase.loadTracks(params).pipe(
      catchError(e => of([]))
    ))
  })
}
