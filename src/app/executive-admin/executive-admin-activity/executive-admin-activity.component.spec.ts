import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminActivityComponent } from './executive-admin-activity.component';

describe('ExecutiveAdminActivityComponent', () => {
  let component: ExecutiveAdminActivityComponent;
  let fixture: ComponentFixture<ExecutiveAdminActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
