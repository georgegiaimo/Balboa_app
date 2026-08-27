import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveAdminComposeMessageComponent } from './executive-admin-compose-message.component';

describe('ExecutiveAdminComposeMessageComponent', () => {
  let component: ExecutiveAdminComposeMessageComponent;
  let fixture: ComponentFixture<ExecutiveAdminComposeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveAdminComposeMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveAdminComposeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
