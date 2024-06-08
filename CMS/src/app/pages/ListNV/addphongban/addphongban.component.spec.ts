import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphongbanComponent } from './addphongban.component';

describe('AddphongbanComponent', () => {
  let component: AddphongbanComponent;
  let fixture: ComponentFixture<AddphongbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddphongbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddphongbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
