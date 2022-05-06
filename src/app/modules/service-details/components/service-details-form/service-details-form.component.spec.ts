import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsFormComponent } from './service-details-form.component';

describe('ServiceDetailsFormComponent', () => {
  let component: ServiceDetailsFormComponent;
  let fixture: ComponentFixture<ServiceDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
