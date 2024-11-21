import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../data/interfaces/login';

interface LoginForm {
  username: FormControl<string>,
  password: FormControl<string>,
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);

  form = new FormGroup<LoginForm>({
    username: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(4)]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(4)]}),
  });

  onSubmit() {
    console.log(this.form.getRawValue());
    this.authService.login(this.form.getRawValue());
  }
}
