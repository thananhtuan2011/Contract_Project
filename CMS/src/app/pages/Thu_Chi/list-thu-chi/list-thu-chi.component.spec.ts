import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThuChiComponent } from './list-thu-chi.component';

describe('ListThuChiComponent', () => {
  let component: ListThuChiComponent;
  let fixture: ComponentFixture<ListThuChiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListThuChiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListThuChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
