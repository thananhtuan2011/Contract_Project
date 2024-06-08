import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNhanvienComponent } from './update-nhanvien.component';

describe('UpdateNhanvienComponent', () => {
  let component: UpdateNhanvienComponent;
  let fixture: ComponentFixture<UpdateNhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNhanvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
