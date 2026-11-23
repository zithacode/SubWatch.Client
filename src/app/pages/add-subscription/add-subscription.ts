import { ChangeDetectorRef, Component } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Topbar } from '../../shared/topbar/topbar';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubscriptionService } from '../../services/subscription';
import { CreateSubscriptionRequest } from '../../models/create-subscription';

@Component({
  selector: 'app-add-subscription',
  imports: [Sidebar, Topbar, RouterLink, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-subscription.html',
  styleUrl: './add-subscription.css',
})
export class AddSubscription {
  addSubForm: FormGroup | any;
  loading = false;
  errorMessage = '';

  constructor(
    private _cdr: ChangeDetectorRef,
    private _subService: SubscriptionService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.addSubForm = this._fb.nonNullable.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(500),
        ],
      ],
      amount: [
        0.01,
        [Validators.required, Validators.min(0.01), Validators.max(100000)],
      ],
      currency: ['ZAR', Validators.required],
      billingCycle: ['Monthly', Validators.required],
      startDate: ['', Validators.required],
      nextBillingDate: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.addSubForm.invalid) {
      this.addSubForm.markAllAsTouched();
      console.log('Errors!');
      return;
    }

    const request: CreateSubscriptionRequest = this.addSubForm.getRawValue();
    this.loading = true;
    this._subService.createSubscription(request).subscribe({
      next: (rez) => {
        console.log(rez);
        this._router.navigateByUrl('subscriptions');
      },
      error: (err) => {
        console.log(err);
        this.errorMessage =
          err.error?.message || 'Unable to add subscription, please try again.';
        this.loading = false;
        this._cdr.detectChanges();
      },
      complete: () => {
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }
}
