import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorshipComponent } from './authorship.component';

describe('AuthorshipComponent', () => {
  let component: AuthorshipComponent;
  let fixture: ComponentFixture<AuthorshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorshipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
