import {Routes} from '@angular/router';
import {EscapesList} from './escapes/escapes-list/escapes-list';
import {EscapesAdd} from './escapes/escapes-add/escapes-add';

export const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: EscapesList},
  {path: 'add', component: EscapesAdd},
];
