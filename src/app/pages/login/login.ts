import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LoginReq, LoginResponse } from '../../models/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  token: LoginResponse | any;
  errorMessage = '';
  loading = false;

  loginForm: FormGroup | any;

  showPassword = false;

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this._fb.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // const { email, password } = this.loginForm.getRawValue();

    // let request: LoginReq = {
    //   email: email,
    //   password: password,
    // };
    const request: LoginReq = this.loginForm.getRawValue();

    this.loading = true;

    this._authService.login(request).subscribe({
      next: (rez) => {
        // localStorage.setItem('token', rez.token);
        this._authService.saveTokens(rez.token, rez.refreshToken);

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        if (returnUrl?.startsWith('/') && !returnUrl.startsWith('//')) {
          this._router.navigateByUrl(returnUrl);
        } else {
          this._router.navigateByUrl('dashboard');
        }

        this.token = rez;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Invalid username/email or password.';
        console.log(err);
        this.loading = false;
        this._cdr.detectChanges();
      },
      complete: () => {
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  togglePasswordVisibility(): void {
    console.log(this.showPassword);
    this.showPassword = !this.showPassword;
  }
}
