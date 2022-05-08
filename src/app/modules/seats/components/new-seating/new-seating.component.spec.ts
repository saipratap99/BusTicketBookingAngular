import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeatingComponent } from './new-seating.component';

describe('NewSeatingComponent', () => {
  let component: NewSeatingComponent;
  let fixture: ComponentFixture<NewSeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSeatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
