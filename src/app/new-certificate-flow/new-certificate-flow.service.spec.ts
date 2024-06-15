import { TestBed } from '@angular/core/testing';

import { NewCertificateFlowService } from './new-certificate-flow.service';

describe('NewCertificateFlowService', () => {
  let service: NewCertificateFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCertificateFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
