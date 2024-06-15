import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateWizardComponent } from './certificate-wizard.component';

describe('CertificateWizardComponent', () => {
  let component: CertificateWizardComponent;
  let fixture: ComponentFixture<CertificateWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
