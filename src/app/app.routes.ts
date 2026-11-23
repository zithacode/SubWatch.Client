import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Analytics } from './pages/analytics/analytics';
import { HelpSupport } from './pages/help-support/help-support';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { SubscriptionDetails } from './pages/subscriptions/subscription-details/subscription-details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'subscriptions/:id',
    component: SubscriptionDetails,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'subscriptions',
    loadComponent: () =>
      import('./pages/subscriptions/subscriptions').then(
        (m) => m.Subscriptions
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-subscription',
    loadComponent: () =>
      import('./pages/add-subscription/add-subscription').then(
        (m) => m.AddSubscription
      ),
    canActivate: [authGuard],
  },
  {
    path: 'help-support',
    component: HelpSupport,
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings').then((m) => m.Settings),
    canActivate: [authGuard],
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./pages/analytics/analytics').then((m) => m.Analytics),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
  },
  { path: 'register', component: Register },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
