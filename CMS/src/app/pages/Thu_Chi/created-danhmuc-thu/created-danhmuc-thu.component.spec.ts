import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDanhmucThuComponent } from './created-danhmuc-thu.component';

describe('CreatedDanhmucThuComponent', () => {
  let component: CreatedDanhmucThuComponent;
  let fixture: ComponentFixture<CreatedDanhmucThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedDanhmucThuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDanhmucThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
