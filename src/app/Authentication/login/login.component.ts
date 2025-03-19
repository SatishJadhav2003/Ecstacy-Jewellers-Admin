import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../Services/util.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide: boolean = true;
  loginForm!: FormGroup;
  readonly auth = inject(AuthService);
  readonly fb = inject(FormBuilder);
  readonly util = inject(UtilService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const temp = {
        Email: this.loginForm.value.email,
        Password: this.loginForm.value.password,
      };
      this.auth.loginByEmailPassword(temp).subscribe(
        (res) => {
          console.log(res);
          if (res.User) {
            if (!res.User.Is_Admin) {
              this.util.warn('User with this email is not an admin');
              return;
            }
            localStorage.setItem('Token', res.Token);
            localStorage.setItem('User', JSON.stringify(res.User));
            localStorage.setItem('User_ID', JSON.stringify(res.User.User_ID));
            this.router.navigate(['../home'], {
              relativeTo: this.route,
            });
          }
        },
        (err) => {
          console.log(err);
          this.util.error(err.error.message);
        }
      );
    }
  }

  getClass(name: string) {
    if (
      this.loginForm.get(name)?.invalid &&
      (this.loginForm.get(name)?.dirty || this.loginForm.get(name)?.touched)
    ) {
      return 'ring-2 ring-red-800';
    }
    return '';
  }
}
