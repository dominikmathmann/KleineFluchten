import {Routes} from '@angular/router';
import {EscapesList} from './escapes/escapes-list/escapes-list';
import {EscapesAdd} from './escapes/escapes-add/escapes-add';
import {Login} from './login/login/login';
import {TracksList} from './tracks/tracks-list/tracks-list';
import {TracksAdd} from './tracks/tracks-add/tracks-add';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'list-escapes', component: EscapesList},
  {path: 'add-escapes', component: EscapesAdd},
  {path: 'list-tracks', component: TracksList},
  {path: 'add-tracks', component: TracksAdd},
  {path: 'login', component: Login},
];
