import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserLogsComponent } from './admin-user-logs.component';

describe('AdminUserLogsComponent', () => {
  let component: AdminUserLogsComponent;
  let fixture: ComponentFixture<AdminUserLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
