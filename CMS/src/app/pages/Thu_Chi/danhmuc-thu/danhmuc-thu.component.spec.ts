import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucThuComponent } from './danhmuc-thu.component';

describe('DanhmucThuComponent', () => {
  let component: DanhmucThuComponent;
  let fixture: ComponentFixture<DanhmucThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhmucThuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
