import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadCongNoComponent } from './cread-cong-no.component';

describe('CreadCongNoComponent', () => {
  let component: CreadCongNoComponent;
  let fixture: ComponentFixture<CreadCongNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreadCongNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadCongNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
