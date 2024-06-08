import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRealityComponent } from './open-reality.component';

describe('OpenRealityComponent', () => {
  let component: OpenRealityComponent;
  let fixture: ComponentFixture<OpenRealityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRealityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRealityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
