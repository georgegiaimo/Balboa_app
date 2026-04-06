import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleUsersComponent } from './google-users.component';

describe('GoogleUsersComponent', () => {
  let component: GoogleUsersComponent;
  let fixture: ComponentFixture<GoogleUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
