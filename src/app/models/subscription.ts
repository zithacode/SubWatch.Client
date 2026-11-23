export interface Subscription {
  id: number;
  name: string;
  amount: any;
  category: string;
  currency: string;
  billingCycle: string;
  nextBillingDate: string;
  startDate: string;
  isActive: boolean;
}

export interface SubscriptionPageRespone {
  items: Subscription[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
export interface UpdateSubscriptionRequest {
  name: string;
  amount: number;
  currency: string;
  billingCycle: string;
  startDate: string;
  nextBillingDate: string;
}
