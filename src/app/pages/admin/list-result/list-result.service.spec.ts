import { TestBed } from '@angular/core/testing';

import { ListResultService } from './list-result.service';

describe('ListResultService', () => {
  let service: ListResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
