import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceDetailsComponent } from './new-service-details.component';

describe('NewServiceDetailsComponent', () => {
  let component: NewServiceDetailsComponent;
  let fixture: ComponentFixture<NewServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
