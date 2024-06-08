import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDanhmucChiComponent } from './created-danhmuc-chi.component';

describe('CreatedDanhmucChiComponent', () => {
  let component: CreatedDanhmucChiComponent;
  let fixture: ComponentFixture<CreatedDanhmucChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedDanhmucChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDanhmucChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
