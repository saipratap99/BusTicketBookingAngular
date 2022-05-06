import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsIndexComponent } from './service-details-index.component';

describe('ServiceDetailsIndexComponent', () => {
  let component: ServiceDetailsIndexComponent;
  let fixture: ComponentFixture<ServiceDetailsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
