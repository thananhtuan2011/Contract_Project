import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedThuComponent } from './created-thu.component';

describe('CreatedThuComponent', () => {
  let component: CreatedThuComponent;
  let fixture: ComponentFixture<CreatedThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedThuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
