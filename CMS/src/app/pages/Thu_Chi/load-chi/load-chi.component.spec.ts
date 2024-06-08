import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadChiComponent } from './load-chi.component';

describe('LoadChiComponent', () => {
  let component: LoadChiComponent;
  let fixture: ComponentFixture<LoadChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
