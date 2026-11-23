import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserInfo } from '../../models/user.model';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  currentUser: UserInfo | null = null;

  constructor(private router: Router, private _authService: AuthService) {
    this.currentUser = this._authService.getCurrentUser();
  }

  get pageTitle(): string {
    const route = this.router.url.split('/')[1];

    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      subscriptions: 'Subscriptions',
      settings: 'Settings',
      'help-support': 'Help & Support',
      'add-subscription': 'Add Subscription',
    };

    return titles[route] || 'Dashboard';
  }

  logout(): void {
    this.router.navigateByUrl('home');
    localStorage.removeItem('token');
  }
}
