import { Subscription } from './subscription';

export interface DashboardSummary {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlySpend: string;
  yearlySpend: string;
}

export interface UpcomingPayment {
  id: number;
  name: string;
  amount: number;
  currency: string;
  billingDate: string;
}
export interface SpendingOverview {
  month: string;
  amount: number;
}
export interface DashboardData {
  summary: DashboardSummary;
  subscriptions: Subscription[];
  upcomingPayments: UpcomingPayment[];
  spendingOverview: SpendingOverview[];
}
