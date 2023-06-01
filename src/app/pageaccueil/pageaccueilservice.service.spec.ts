import { TestBed } from '@angular/core/testing';

import { PageaccueilserviceService } from './pageaccueilservice.service';

describe('PageaccueilserviceService', () => {
  let service: PageaccueilserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageaccueilserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
