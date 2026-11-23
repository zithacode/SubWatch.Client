import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  imports: [NgClass],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  @Input() title: string = '';
  @Input() value: string | null = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() color: string = 'purple';
}
