import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceDetailsComponent } from './delete-service-details.component';

describe('DeleteServiceDetailsComponent', () => {
  let component: DeleteServiceDetailsComponent;
  let fixture: ComponentFixture<DeleteServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
