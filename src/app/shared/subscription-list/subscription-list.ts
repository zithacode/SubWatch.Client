import { Component, Input } from '@angular/core';
import { Subscription } from '../../models/subscription';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscription-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css',
})
export class SubscriptionList {
  @Input() subscriptions: Subscription[] = [];
}
