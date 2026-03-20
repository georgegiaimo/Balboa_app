import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedUsersComponent } from './unassigned-users.component';

describe('UnassignedUsersComponent', () => {
  let component: UnassignedUsersComponent;
  let fixture: ComponentFixture<UnassignedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnassignedUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnassignedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
