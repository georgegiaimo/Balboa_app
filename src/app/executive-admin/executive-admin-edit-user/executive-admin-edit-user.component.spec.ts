import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminEditUserComponent } from './executive-admin-edit-user.component';

describe('ExecutiveAdminEditUserComponent', () => {
  let component: ExecutiveAdminEditUserComponent;
  let fixture: ComponentFixture<ExecutiveAdminEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
