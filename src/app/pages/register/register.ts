import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { RegisterRequest } from '../../models/auth';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  errorMessage = '';
  loading = false;

  registerForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.nonNullable.group({
      email: ['example@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, confirmPassword } =
      this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.errorMessage = 'Password  do not match.';
      return;
    }

    const req: RegisterRequest = {
      email,
      password,
    };

    this.loading = true;

    this.authService.register(req).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        console.log('register-component: registerd!');
      },
      error: (err) => {
        console.log('register-component: error!');
        console.log(err.error?.message);
        this.errorMessage =
          err.error?.message || 'Registration failed, Please try again.';
        this.loading = false;
        this._cdr.detectChanges();
      },
      complete: () => {
        console.log('register-component: complete!');
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
}
