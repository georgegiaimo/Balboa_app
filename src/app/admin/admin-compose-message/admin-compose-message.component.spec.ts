import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComposeMessageComponent } from './admin-compose-message.component';

describe('AdminComposeMessageComponent', () => {
  let component: AdminComposeMessageComponent;
  let fixture: ComponentFixture<AdminComposeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComposeMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComposeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
