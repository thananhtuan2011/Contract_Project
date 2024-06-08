import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDanhmucThuComponent } from './update-danhmuc-thu.component';

describe('UpdateDanhmucThuComponent', () => {
  let component: UpdateDanhmucThuComponent;
  let fixture: ComponentFixture<UpdateDanhmucThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDanhmucThuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDanhmucThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
