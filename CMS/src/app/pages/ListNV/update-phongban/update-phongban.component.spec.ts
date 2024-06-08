import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhongbanComponent } from './update-phongban.component';

describe('UpdatePhongbanComponent', () => {
  let component: UpdatePhongbanComponent;
  let fixture: ComponentFixture<UpdatePhongbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhongbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhongbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
