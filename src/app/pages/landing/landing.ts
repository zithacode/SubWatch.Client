import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserInfo } from '../../models/user.model';
import { SubscriptionService } from '../../services/subscription';
import { Subscription } from '../../models/subscription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit {
  currentUser: UserInfo | null = null;
  overViewSubs: Subscription[] = [];

  loadingOverView = false;
  totalOverViewSubs = 0;
  errorMessage = '';

  isLoggedIn = false;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _subService: SubscriptionService,
    private _router: Router
  ) {
    // this.currentUser = this._authService.getCurrentUser();
    this.isLoggedIn = this._authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.currentUser = this._authService.getCurrentUser();
    }
  }

  ngOnInit(): void {
    this.loadSubscriptions();
    // throw new Error('Method not implemented.');
  }

  loadSubscriptions(): void {
    this.errorMessage = '';
    this.loadingOverView = true;
    this._subService.getSubscriptions('', 1, 3).subscribe({
      next: (rez) => {
        this.overViewSubs = rez.items;
        this.totalOverViewSubs = rez.totalCount;
      },
      error: (err) => {
        console.log(err.error?.message);
        this.loadingOverView = false;
        this.errorMessage =
          err.error?.message || 'Unable to load subscriptions.';
        this._cdr.detectChanges();
      },
      complete: () => {
        this.loadingOverView = false;
        this._cdr.detectChanges();
      },
    });
  }

  get overViewMonthlyExpense(): number {
    if (this.overViewSubs.length !== 0) {
      return this.overViewSubs.reduce((total, s) => {
        return total + (s.billingCycle === 'Yearly' ? s.amount / 12 : s.amount);
      }, 0);
    }
    return 0.0;
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('login');
  }
}
