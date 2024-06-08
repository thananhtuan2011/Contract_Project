import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnvComponent } from './addnv.component';

describe('AddnvComponent', () => {
  let component: AddnvComponent;
  let fixture: ComponentFixture<AddnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
