import { Component, OnInit, signal } from '@angular/core';
import { Subscription } from '../../../models/subscription';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubscriptionService } from '../../../services/subscription';
import { Topbar } from '../../../shared/topbar/topbar';
import { Sidebar } from '../../../shared/sidebar/sidebar';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-subscription-details',
  imports: [Topbar, Sidebar, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './subscription-details.html',
  styleUrl: './subscription-details.css',
})
export class SubscriptionDetails implements OnInit {
  subscription = signal<Subscription | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  editId: number | null = null;
  deleteId: number | null = null;
  currentSubscriptionId: number | null = null;

  isEditing = signal(false);
  isloadingApiResponse = signal(false);

  editForm: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private _subsService: SubscriptionService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['ZAR', Validators.required],
      billingCycle: ['Monthly', Validators.required],
      startDate: ['', Validators.required],
      nextBillingDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.deleteId = id;
    this.editId = id;
    this.currentSubscriptionId = id;

    if (!id || isNaN(id)) {
      this.errorMessage.set('Invalid subscription ID.');

      this.loading.set(false);

      return;
    }

    this.loadSubscription();
  }

  loadSubscription(): void {
    this._subsService
      .getSubscriptionById(this.currentSubscriptionId!)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.subscription.set(res);
        },
        error: (err) => {
          console.log('Failed to load subsctriptions:', err);
          this.errorMessage.set('Unable to load subscription details');
          console.log(err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  // deleteSubscription() {
  //   console.log(this.deleteId, ' to delete');
  //   this._router.navigateByUrl('subscriptions');
  // }
  editSubscription() {}

  editingSubscription(): void {
    const sub = this.subscription();

    if (!sub) return;

    this.editForm.patchValue({
      name: sub.name,
      amount: sub.amount,
      currency: sub.currency,
      billingCycle: sub.billingCycle,
      startDate: sub.startDate.substring(0, 10),
      nextBillingDate: sub.nextBillingDate.substring(0, 10),
    });
    this.isEditing.set(true);
  }
  cancelEdit(): void {
    this.isEditing.set(false);
  }
  saveChanges(): void {
    this.isloadingApiResponse.set(true);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const sub = this.subscription();

    if (!sub) return;

    const request = this.editForm.getRawValue();

    this._subsService.updateSubscription(request, sub.id).subscribe({
      next: () => {
        this.isEditing.set(false);
        console.log('Subscription udpate.');
        this.isloadingApiResponse.set(false);
        // this.loadSubscription();
        this.subscription.set(request);
      },
      error: (err) => {
        console.log(err);

        this.errorMessage.set(
          'Unable to update subscription, Please try again.'
        );
        this.isloadingApiResponse.set(false);
      },
    });
  }

  deleteSubscription(): void {
    const sub = this.subscription();

    if (!sub) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete${sub.name}?`
    );

    if (!confirmed) return;

    this._subsService.deleteSubscription(sub.id).subscribe({
      next: () => {
        this._router.navigate(['/subscriptions']);
      },
      error: (error) => {
        console.error('Failed to delete subscription:', error);
        this.errorMessage.set(
          'Unable to delete subscription. Please try again.'
        );
      },
    });
  }
}
