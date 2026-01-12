import {Component, inject, signal} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {Field, form, required} from '@angular/forms/signals';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../shared/user-service';

interface LoginData{
  username: string,
  password: string
}


@Component({
  selector: 'ddkf-login',
  imports: [
    MatInput,
    MatFormField,
    Field,
    MatButton,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  userService = inject(UserService);

  login = signal<LoginData>({
    username: '',
    password: ''
  })

  loginForm = form<LoginData>(this.login, (form) => {
    required(form.username);
    required(form.password);
  })

  performLogin() {
    this.userService.login(this.login().username, this.login().password).subscribe();
  }
}
