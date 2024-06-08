import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedHoaDonCongNoComponent } from './created-hoa-don-cong-no.component';

describe('CreatedHoaDonCongNoComponent', () => {
  let component: CreatedHoaDonCongNoComponent;
  let fixture: ComponentFixture<CreatedHoaDonCongNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedHoaDonCongNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedHoaDonCongNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
