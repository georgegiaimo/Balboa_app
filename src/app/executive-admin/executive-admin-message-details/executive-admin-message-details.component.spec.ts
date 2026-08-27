import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminMessageDetailsComponent } from './executive-admin-message-details.component';

describe('ExecutiveAdminMessageDetailsComponent', () => {
  let component: ExecutiveAdminMessageDetailsComponent;
  let fixture: ComponentFixture<ExecutiveAdminMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminMessageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
