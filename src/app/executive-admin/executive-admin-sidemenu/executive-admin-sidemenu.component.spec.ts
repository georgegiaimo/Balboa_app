import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminSidemenuComponent } from './executive-admin-sidemenu.component';

describe('ExecutiveAdminSidemenuComponent', () => {
  let component: ExecutiveAdminSidemenuComponent;
  let fixture: ComponentFixture<ExecutiveAdminSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminSidemenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
