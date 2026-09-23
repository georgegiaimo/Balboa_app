import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTwoFactorAuthenticationComponent } from './setup-two-factor-authentication.component';

describe('SetupTwoFactorAuthenticationComponent', () => {
  let component: SetupTwoFactorAuthenticationComponent;
  let fixture: ComponentFixture<SetupTwoFactorAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupTwoFactorAuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupTwoFactorAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
