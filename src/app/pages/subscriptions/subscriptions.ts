import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Topbar } from '../../shared/topbar/topbar';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SubscriptionService } from '../../services/subscription';
import { Subscription } from '../../models/subscription';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscriptions',
  imports: [
    Sidebar,
    Topbar,
    RouterLink,
    CommonModule,
    CurrencyPipe,
    FormsModule,
  ],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css',
})
export class Subscriptions implements OnInit {
  subscriptions: Subscription[] = [];
  filteredSubscription: Subscription[] = [];

  loading = false;
  isSearching = false;
  errorMessage = '';

  searchText: string = '';

  totalCount = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 4;

  activeSubs: number = 0;
  totalExpense: number = 0;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _subService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  onChange() {
    console.log('Searching for subscriptions');
    this.isSearching = true;
    // this.loadSubscriptions();
    this._subService
      .getSubscriptions(this.searchText, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          // console.log(response.items);
          this.subscriptions = response.items;
        },
        error: (err) => {
          console.log('error loading subscriptions!');
          console.log(err);
          this.errorMessage =
            err.error?.message || 'Unable to load subscriptions';
          this.isSearching = false;
          this._cdr.detectChanges();
        },
        complete: () => {
          console.log('Completed loading subscriptions.');
          this.isSearching = false;
          this.errorMessage = '';
          this._cdr.detectChanges();
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      // this.loadSubscriptions();
      this.onChange();
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // this.loadSubscriptions();
      this.onChange();
    }
  }
  loadSubscriptions() {
    this.loading = true;
    this.errorMessage = '';

    this._subService
      .getSubscriptions(this.searchText, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          // console.log(response.items);
          this.subscriptions = response.items;
          this.totalCount = response.totalCount;
          this.totalPages = response.totalPages;
          this.pageSize = response.pageSize;

          this.totalExpense = this.monthlyExpenseF();
          this.activeSubs = this.activeSubscriptionF();
        },
        error: (err) => {
          console.log('error loading subscriptions!');
          console.log(err);
          this.errorMessage =
            err.error?.message || 'Unable to load subscriptions';
          this.loading = false;
          this._cdr.detectChanges();
        },
        complete: () => {
          console.log('Completed loading subscriptions.');
          this.loading = false;
          this.errorMessage = '';
          this._cdr.detectChanges();
        },
      });
  }

  // get totalSubscription(): number {
  //   return this.totalCount;
  // }

  activeSubscriptionF(): number {
    return this.subscriptions.filter((s) => s.isActive).length;
  }

  monthlyExpenseF(): number {
    if (this.subscriptions.length !== 0) {
      return this.subscriptions.reduce((total, s) => {
        return total + (s.billingCycle === 'Yearly' ? s.amount / 12 : s.amount);
      }, 0);
    }
    return 0.0;
  }
}
