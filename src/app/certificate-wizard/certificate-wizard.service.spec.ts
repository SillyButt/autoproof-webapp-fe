import { TestBed } from '@angular/core/testing';

import { CertificateWizardService } from './certificate-wizard.service';

describe('CertificateWizardService', () => {
  let service: CertificateWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
