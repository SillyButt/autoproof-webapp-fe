import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCertificateFlowComponent } from './new-certificate-flow.component';

describe('NewCertificateFlowComponent', () => {
  let component: NewCertificateFlowComponent;
  let fixture: ComponentFixture<NewCertificateFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCertificateFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCertificateFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
