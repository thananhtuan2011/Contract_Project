import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDetailComponent } from './open-detail.component';

describe('OpenDetailComponent', () => {
  let component: OpenDetailComponent;
  let fixture: ComponentFixture<OpenDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
