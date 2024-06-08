import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateThuComponent } from './update-thu.component';

describe('UpdateThuComponent', () => {
  let component: UpdateThuComponent;
  let fixture: ComponentFixture<UpdateThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateThuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
