import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChiPlanComponent } from './load-chi-plan.component';

describe('LoadChiPlanComponent', () => {
  let component: LoadChiPlanComponent;
  let fixture: ComponentFixture<LoadChiPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadChiPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChiPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
