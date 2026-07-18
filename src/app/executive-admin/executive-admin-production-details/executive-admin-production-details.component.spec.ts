import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminProductionDetailsComponent } from './executive-admin-production-details.component';

describe('ExecutiveAdminProductionDetailsComponent', () => {
  let component: ExecutiveAdminProductionDetailsComponent;
  let fixture: ComponentFixture<ExecutiveAdminProductionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminProductionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminProductionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
