import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRolesComponent } from './see-roles.component';

describe('SeeRolesComponent', () => {
  let component: SeeRolesComponent;
  let fixture: ComponentFixture<SeeRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
