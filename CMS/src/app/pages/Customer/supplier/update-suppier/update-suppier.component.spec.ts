import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuppierComponent } from './update-suppier.component';

describe('UpdateSuppierComponent', () => {
  let component: UpdateSuppierComponent;
  let fixture: ComponentFixture<UpdateSuppierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSuppierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuppierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
