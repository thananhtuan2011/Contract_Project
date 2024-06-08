import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsnhanvienComponent } from './dsnhanvien.component';

describe('DsnhanvienComponent', () => {
  let component: DsnhanvienComponent;
  let fixture: ComponentFixture<DsnhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsnhanvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsnhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
