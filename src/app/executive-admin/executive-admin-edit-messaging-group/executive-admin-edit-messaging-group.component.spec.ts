import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminEditMessagingGroupComponent } from './executive-admin-edit-messaging-group.component';

describe('ExecutiveAdminEditMessagingGroupComponent', () => {
  let component: ExecutiveAdminEditMessagingGroupComponent;
  let fixture: ComponentFixture<ExecutiveAdminEditMessagingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminEditMessagingGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminEditMessagingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
