import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDetailsFormComponent } from './bus-details-form.component';

describe('BusDetailsFormComponent', () => {
  let component: BusDetailsFormComponent;
  let fixture: ComponentFixture<BusDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
