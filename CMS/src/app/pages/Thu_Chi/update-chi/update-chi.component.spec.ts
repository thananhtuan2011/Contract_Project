import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChiComponent } from './update-chi.component';

describe('UpdateChiComponent', () => {
  let component: UpdateChiComponent;
  let fixture: ComponentFixture<UpdateChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
