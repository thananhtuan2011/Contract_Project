import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupRolesComponent } from './new-group-roles.component';

describe('NewGroupRolesComponent', () => {
  let component: NewGroupRolesComponent;
  let fixture: ComponentFixture<NewGroupRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroupRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
