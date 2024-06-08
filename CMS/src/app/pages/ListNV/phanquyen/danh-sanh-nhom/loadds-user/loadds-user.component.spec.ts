import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaddsUserComponent } from './loadds-user.component';

describe('LoaddsUserComponent', () => {
  let component: LoaddsUserComponent;
  let fixture: ComponentFixture<LoaddsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaddsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaddsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
