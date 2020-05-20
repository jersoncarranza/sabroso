import { TestBed } from '@angular/core/testing';

import { UserModeloService } from './user-modelo.service';

describe('UserModeloService', () => {
  let service: UserModeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserModeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
