import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanThuChiComponent } from './add-plan-thu-chi.component';

describe('AddPlanThuChiComponent', () => {
  let component: AddPlanThuChiComponent;
  let fixture: ComponentFixture<AddPlanThuChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanThuChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanThuChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
