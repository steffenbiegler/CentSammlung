import { TestBed, inject } from '@angular/core/testing';

import { CentBackendService } from './cent-backend.service';

describe('CentBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentBackendService]
    });
  });

  it('should be created', inject([CentBackendService], (service: CentBackendService) => {
    expect(service).toBeTruthy();
  }));
});
