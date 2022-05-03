import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailsOverviewComponent } from './booking-details-overview.component';

describe('BookingDetailsOverviewComponent', () => {
  let component: BookingDetailsOverviewComponent;
  let fixture: ComponentFixture<BookingDetailsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDetailsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
