import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSanhNhomComponent } from './danh-sanh-nhom.component';

describe('DanhSanhNhomComponent', () => {
  let component: DanhSanhNhomComponent;
  let fixture: ComponentFixture<DanhSanhNhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhSanhNhomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSanhNhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
