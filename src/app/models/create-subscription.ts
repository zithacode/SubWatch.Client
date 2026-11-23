export interface CreateSubscriptionRequest {
  name: string;
  amount: number;
  currency: string;
  billingCycle: string;
  startDate: string;
  nextBillingDate: string;
}
