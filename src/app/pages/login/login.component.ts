import { AuthService } from '../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../data/interfaces/login';
import { Router } from '@angular/router';
interface LoginForm {
  email: FormControl<string>,
  isReg: FormControl<Boolean>,
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
  router = inject(Router);

  form = new FormGroup<LoginForm>({
    isReg: new FormControl(false, {nonNullable: true}),
    email: new FormControl('email1@mail', {nonNullable: true, validators: [Validators.required, Validators.minLength(4)]}),
    username: new FormControl('user1', {nonNullable: true, validators: [Validators.required, Validators.minLength(4)]}),
    password: new FormControl('1111', {nonNullable: true, validators: [Validators.required, Validators.minLength(4)]}),
  });

  names = {true: 'Register', false: 'Login'};
  errorReq = '';

  onLogin() {
    console.log(this.form.getRawValue());

    if (this.form.get('isReg')?.getRawValue()) {
      console.log(":Reg:",this.form.get('isReg'), this.form.value);
      this.authService.register(this.form.getRawValue()).subscribe(d => {
        console.log('RESPONSE:Reg:', d)
      });
    } else {
      console.log(":Login:");
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (d) => {
          console.log('RESPONSE:Login:', d);
          this.router.navigate(['']);
        },
        error: (e) => {
          console.log('RESPONSE:Login:', e);
          this.errorReq = e.error
        }
      });    
    }
  }
}
