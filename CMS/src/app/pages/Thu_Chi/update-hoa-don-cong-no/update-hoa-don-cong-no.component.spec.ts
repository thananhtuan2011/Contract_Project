import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHoaDonCongNoComponent } from './update-hoa-don-cong-no.component';

describe('UpdateHoaDonCongNoComponent', () => {
  let component: UpdateHoaDonCongNoComponent;
  let fixture: ComponentFixture<UpdateHoaDonCongNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHoaDonCongNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHoaDonCongNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
