import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebComponent } from './beb.component';

describe('BebComponent', () => {
  let component: BebComponent;
  let fixture: ComponentFixture<BebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
