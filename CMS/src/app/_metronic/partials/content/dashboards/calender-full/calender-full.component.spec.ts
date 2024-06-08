import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderFullComponent } from './calender-full.component';

describe('CalenderFullComponent', () => {
  let component: CalenderFullComponent;
  let fixture: ComponentFixture<CalenderFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
