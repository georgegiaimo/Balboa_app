import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditMessagingGroupComponent } from './admin-edit-messaging-group.component';

describe('AdminEditMessagingGroupComponent', () => {
  let component: AdminEditMessagingGroupComponent;
  let fixture: ComponentFixture<AdminEditMessagingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditMessagingGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditMessagingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
