import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanThuChiComponent } from './plan-thu-chi.component';

describe('PlanThuChiComponent', () => {
  let component: PlanThuChiComponent;
  let fixture: ComponentFixture<PlanThuChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanThuChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanThuChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
