import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadThuPlanComponent } from './load-thu-plan.component';

describe('LoadThuPlanComponent', () => {
  let component: LoadThuPlanComponent;
  let fixture: ComponentFixture<LoadThuPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadThuPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadThuPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
