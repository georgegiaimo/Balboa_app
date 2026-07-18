import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminMailingComponent } from './executive-admin-mailing.component';

describe('ExecutiveAdminMailingComponent', () => {
  let component: ExecutiveAdminMailingComponent;
  let fixture: ComponentFixture<ExecutiveAdminMailingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminMailingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminMailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
