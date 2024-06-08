import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedChiComponent } from './created-chi.component';

describe('CreatedChiComponent', () => {
  let component: CreatedChiComponent;
  let fixture: ComponentFixture<CreatedChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
