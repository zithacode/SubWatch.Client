import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Subscription } from './app/models/subscription';
import { SubscriptionService } from './app/services/subscription';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { appConfig } from './app/app.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
  <router-outlet></router-outlet>
  `,
})
export class App {}

bootstrapApplication(App, appConfig).catch((err) => console.log(err));
