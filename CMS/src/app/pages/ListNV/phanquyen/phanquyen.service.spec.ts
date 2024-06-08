import { TestBed } from '@angular/core/testing';

import { PhanquyenService } from './phanquyen.service';

describe('PhanquyenService', () => {
  let service: PhanquyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhanquyenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
