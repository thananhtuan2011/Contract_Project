import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDanhmucChiComponent } from './update-danhmuc-chi.component';

describe('UpdateDanhmucChiComponent', () => {
  let component: UpdateDanhmucChiComponent;
  let fixture: ComponentFixture<UpdateDanhmucChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDanhmucChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDanhmucChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
