import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminMessagingGroupsComponent } from './executive-admin-messaging-groups.component';

describe('ExecutiveAdminMessagingGroupsComponent', () => {
  let component: ExecutiveAdminMessagingGroupsComponent;
  let fixture: ComponentFixture<ExecutiveAdminMessagingGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminMessagingGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminMessagingGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
