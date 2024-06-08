import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRolesGroupComponent } from './update-roles-group.component';

describe('UpdateRolesGroupComponent', () => {
  let component: UpdateRolesGroupComponent;
  let fixture: ComponentFixture<UpdateRolesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRolesGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRolesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
