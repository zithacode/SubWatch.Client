import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription';
import { Observable } from 'rxjs';
import { SubscriptionPageRespone } from '../models/subscription';
import { API_CONFIG } from '../enums/api.enums';
import { HttpClient } from '@angular/common/http';
import {
  DashboardSummary,
  SpendingOverview,
  UpcomingPayment,
} from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private _http: HttpClient,
    private subscriptionService: SubscriptionService
  ) {}

  getSubscription(): Observable<SubscriptionPageRespone> {
    return this.subscriptionService.getSubscriptions('', 1, 100);
  }

  getSummary(): Observable<DashboardSummary> {
    return this._http.get<DashboardSummary>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.dashboard.summary}`
    );
  }

  getUpcomingPayments(): Observable<UpcomingPayment[]> {
    return this._http.get<UpcomingPayment[]>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.dashboard.upcomingPayments}`
    );
  }

  getSpendingOverview(): Observable<SpendingOverview[]> {
    return this._http.get<SpendingOverview[]>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.dashboard.spendingOverview}`
    );
  }
}
