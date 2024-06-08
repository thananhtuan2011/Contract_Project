import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoleDepartmentComponent } from './update-role-department.component';

describe('UpdateRoleDepartmentComponent', () => {
  let component: UpdateRoleDepartmentComponent;
  let fixture: ComponentFixture<UpdateRoleDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRoleDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRoleDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
