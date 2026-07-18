import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminUsersComponent } from './executive-admin-users.component';

describe('ExecutiveAdminUsersComponent', () => {
  let component: ExecutiveAdminUsersComponent;
  let fixture: ComponentFixture<ExecutiveAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
