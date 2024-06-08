import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanChiComponent } from './add-plan-chi.component';

describe('AddPlanChiComponent', () => {
  let component: AddPlanChiComponent;
  let fixture: ComponentFixture<AddPlanChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
