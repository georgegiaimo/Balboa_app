import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminProductionsComponent } from './executive-admin-productions.component';

describe('ExecutiveAdminProductionsComponent', () => {
  let component: ExecutiveAdminProductionsComponent;
  let fixture: ComponentFixture<ExecutiveAdminProductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminProductionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminProductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
