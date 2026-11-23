import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPayments } from './upcoming-payments';

describe('UpcomingPayments', () => {
  let component: UpcomingPayments;
  let fixture: ComponentFixture<UpcomingPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingPayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
