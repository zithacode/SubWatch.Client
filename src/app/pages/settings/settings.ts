import { Component, signal } from '@angular/core';
import { Topbar } from '../../shared/topbar/topbar';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { SettingsService } from '../../services/settings';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MemberInfo } from '../../models/member.model';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [Topbar, Sidebar, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  isLoading = signal<boolean>(false);
  error = signal('');
  currentEmail: string | undefined = '';

  membershipForm: FormGroup | any;
  isLoggedIn: boolean;

  deleteAccountForm: FormGroup | any;
  isDeletingAccount = signal(false);
  deleteAccountError = signal('');
  deletePassword = '';

  constructor(
    private settingService: SettingsService,
    private fb: FormBuilder,
    private authService: AuthService,
    private _router: Router
  ) {
    this.membershipForm = fb.nonNullable.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      email: ['', [Validators.email]],
    });

    this.deleteAccountForm = this.fb.nonNullable.group({
      password: ['', Validators.required],
    });

    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.authService.getCurrentUser() && this.isLoggedIn) {
      console.log(this.authService.getCurrentUser()!.email);
      this.currentEmail = this.authService.getCurrentUser()!.email;
      // this.de = this.authService.getCurrentUser()!.email;
      this.membershipForm.patchValue({
        email: this.currentEmail,
      });
    }
  }

  updateMemberInfo() {
    this.isLoading.set(true);
    this.error.set('');
    console.log(this.authService.getCurrentUser()!.email);

    if (this.membershipForm.invalid) {
      this.membershipForm.markAllAsTouched();
      this.isLoading.set(false);
      this.error.set('client validation error');
      return;
    }

    const request: MemberInfo = this.membershipForm.getRawValue();
    this.settingService.updateMemberInfo(request, this.currentEmail).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });

    console.log(this.membershipForm.value);
  }

  deleteAccount(): void {
    this.isDeletingAccount.set(true);
    this.deleteAccountError.set('');

    // if (!this.deletePassword) {
    //   console.log('errors');
    //   this.deleteAccountForm.markAllAsTouched();
    //   this.isDeletingAccount.set(false);
    //   this.deleteAccountError.set('Password is required.');
    //   return;
    // }

    const confirmed = window.confirm(
      'Are you sure you want to permanently delete your account? This cannot be undone.'
    );
    if (!confirmed) return;

    const password: string = this.deletePassword;

    this.authService.deleteAccount(password).subscribe({
      next: () => {
        this._router.navigateByUrl('/');
        localStorage.removeItem('token');
        localStorage.clear();
      },
      error: (err) => {
        this.deleteAccountError.set(
          err.error?.message || 'Unable to delete your account.'
        );
        this.isDeletingAccount.set(false);
      },
    });
  }
}
