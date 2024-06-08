import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCongNoComponent } from './load-cong-no.component';

describe('LoadCongNoComponent', () => {
  let component: LoadCongNoComponent;
  let fixture: ComponentFixture<LoadCongNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCongNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCongNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
