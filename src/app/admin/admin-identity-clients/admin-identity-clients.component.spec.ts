import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdentityClientsComponent } from './admin-identity-clients.component';

describe('AdminIdentityClientsComponent', () => {
  let component: AdminIdentityClientsComponent;
  let fixture: ComponentFixture<AdminIdentityClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminIdentityClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIdentityClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
