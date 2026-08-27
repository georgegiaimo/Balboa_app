import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessageDetailsComponent } from './admin-message-details.component';

describe('AdminMessageDetailsComponent', () => {
  let component: AdminMessageDetailsComponent;
  let fixture: ComponentFixture<AdminMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
