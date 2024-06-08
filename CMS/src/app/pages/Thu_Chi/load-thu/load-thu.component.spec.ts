import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadThuComponent } from './load-thu.component';

describe('LoadThuComponent', () => {
  let component: LoadThuComponent;
  let fixture: ComponentFixture<LoadThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadThuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
