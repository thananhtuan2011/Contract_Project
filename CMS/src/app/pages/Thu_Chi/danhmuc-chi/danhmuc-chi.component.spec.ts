import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucChiComponent } from './danhmuc-chi.component';

describe('DanhmucChiComponent', () => {
  let component: DanhmucChiComponent;
  let fixture: ComponentFixture<DanhmucChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhmucChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
