import {Routes} from '@angular/router';
import {EscapesList} from './escapes/escapes-list/escapes-list';
import {EscapesAdd} from './escapes/escapes-add/escapes-add';
import {Login} from './login/login/login';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'list', component: EscapesList},
  {path: 'add', component: EscapesAdd},
  {path: 'login', component: Login},
];
