import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFlowComponent } from './first-flow.component';

describe('FirstFlowComponent', () => {
  let component: FirstFlowComponent;
  let fixture: ComponentFixture<FirstFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
