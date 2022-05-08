import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingTypesComponent } from './seating-types.component';

describe('SeatingTypesComponent', () => {
  let component: SeatingTypesComponent;
  let fixture: ComponentFixture<SeatingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatingTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
