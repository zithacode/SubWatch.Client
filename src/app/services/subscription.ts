import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Subscription,
  SubscriptionPageRespone,
  UpdateSubscriptionRequest,
} from '../models/subscription';
import { CreateSubscriptionRequest } from '../models/create-subscription';
import { API_CONFIG } from '../enums/api.enums';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  // private _http = inject(HttpClient);

  private readonly apiUrl = API_CONFIG.baseURl;

  constructor(private _http: HttpClient) {}

  getSubscriptions(
    searchText: string = '',
    page: number = 1,
    pageSize: number = 4
  ): Observable<SubscriptionPageRespone> {
    const params = { page, pageSize, searchText };

    return this._http.get<SubscriptionPageRespone>(
      `${this.apiUrl}${API_CONFIG.endpoints.subscriptions.getAll}`,
      { params }
    );
  }

  createSubscription(sub: CreateSubscriptionRequest): Observable<unknown> {
    return this._http.post<unknown>(
      `${this.apiUrl}${API_CONFIG.endpoints.subscriptions.create}`,
      sub
    );
  }
  getSubscriptionById(id: number): Observable<Subscription> {
    return this._http.get<Subscription>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.subscriptions.getById(id)}`
    );
  }
  updateSubscription(
    data: UpdateSubscriptionRequest,
    id: number
  ): Observable<unknown> {
    return this._http.put<unknown>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.subscriptions.update(id)}`,
      data
    );
  }
  deleteSubscription(id: number): Observable<unknown> {
    return this._http.delete<unknown>(
      `${API_CONFIG.baseURl}${API_CONFIG.endpoints.subscriptions.delete(id)}`
    );
  }
}
