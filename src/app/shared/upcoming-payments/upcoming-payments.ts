import { Component, Input } from '@angular/core';
import { UpcomingPayment } from '../../models/dashboard.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-upcoming-payments',
  imports: [CommonModule],
  templateUrl: './upcoming-payments.html',
  styleUrl: './upcoming-payments.css',
})
export class UpcomingPayments {
  // export interface UpcomingPayment {
  //   id: number;
  //   name: string;
  //   amount: number;
  //   currency: string;
  //   billingDate: string;
  // }
  @Input() payments: UpcomingPayment[] = [
    {
      id: 1,
      name: 'Netflix',
      amount: 199,
      currency: 'ZAR',
      billingDate: '25 Nov 2026',
      // category: 'Entertainment',
    },
    {
      id: 2,
      name: 'Spotify',
      amount: 69.99,
      currency: 'ZAR',
      billingDate: '27 Nov 2026',
      // category: 'Music',
    },
    {
      id: 3,
      name: 'Microsoft 365',
      amount: 1299,
      currency: 'ZAR',
      billingDate: '02 Dec 2026',
      // category: 'Productivity',
    },
  ];
}
