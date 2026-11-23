import { Component, OnInit, signal } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Topbar } from '../../shared/topbar/topbar';
import { SummaryCard } from '../../shared/summary-card/summary-card';
import { SubscriptionList } from '../../shared/subscription-list/subscription-list';
import { UpcomingPayments } from '../../shared/upcoming-payments/upcoming-payments';
import { SpendingChart } from '../../shared/spending-chart/spending-chart';
import { RouterLink } from '@angular/router';
import {
  DashboardSummary,
  SpendingOverview,
  UpcomingPayment,
} from '../../models/dashboard.model';
import { Subscription } from '../../models/subscription';
import { DashboardService } from '../../services/dashboard.service';
import { SubscriptionService } from '../../services/subscription';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    Sidebar,
    Topbar,
    SummaryCard,
    SubscriptionList,
    UpcomingPayments,
    SpendingChart,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  summary = signal<DashboardSummary | null>(null);
  subscriptions = signal<Subscription[]>([]);
  upcomingPayments = signal<UpcomingPayment[]>([]);
  spendingOverview = signal<SpendingOverview[]>([]);

  isLoading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private _dashboardService: DashboardService,
    private _subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading.set(true);
    this.error.set(null);

    forkJoin({
      summary: this._dashboardService.getSummary(),
      subscriptions: this._dashboardService.getSubscription(),
      upcomingPayments: this._dashboardService.getUpcomingPayments(),
      spendingOverview: this._dashboardService.getSpendingOverview(),
    }).subscribe({
      next: (data) => {
        this.summary.set(data.summary);
        this.subscriptions.set(data.subscriptions.items);
        this.upcomingPayments.set(data.upcomingPayments);
        this.spendingOverview.set(data.spendingOverview);

        // this.isLoading()
      },
      error: (err) => {
        console.log('Dashboard loading failed:', err);

        this.error.set(
          err.error?.message ||
            'Unable to load your dashboard. Please try again.'
        );
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
