import {Component, effect, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserService} from './shared/user-service';

@Component({
  selector: 'ddkf-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('KleineFluchten');

  userService = inject(UserService);
  router  = inject(Router);

  constructor() {
    effect(() => {
      if( this.userService.idToken()){
        this.router.navigateByUrl('/list')
      }
    });
  }
}
