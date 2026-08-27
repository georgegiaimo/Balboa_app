import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminMessagingComponent } from './executive-admin-messaging.component';

describe('ExecutiveAdminMessagingComponent', () => {
  let component: ExecutiveAdminMessagingComponent;
  let fixture: ComponentFixture<ExecutiveAdminMessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminMessagingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
