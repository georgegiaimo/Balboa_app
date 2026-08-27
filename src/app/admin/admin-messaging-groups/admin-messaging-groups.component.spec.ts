import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagingGroupsComponent } from './admin-messaging-groups.component';

describe('AdminMessagingGroupsComponent', () => {
  let component: AdminMessagingGroupsComponent;
  let fixture: ComponentFixture<AdminMessagingGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessagingGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMessagingGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
