import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCalenderComponent } from './load-calender.component';

describe('LoadCalenderComponent', () => {
  let component: LoadCalenderComponent;
  let fixture: ComponentFixture<LoadCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadCalenderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
