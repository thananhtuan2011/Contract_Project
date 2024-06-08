import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderFullRealityComponent } from './calender-full-reality.component';

describe('CalenderFullRealityComponent', () => {
  let component: CalenderFullRealityComponent;
  let fixture: ComponentFixture<CalenderFullRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderFullRealityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderFullRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
