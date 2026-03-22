import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAssignmentComponent } from './edit-user-assignment.component';

describe('EditUserAssignmentComponent', () => {
  let component: EditUserAssignmentComponent;
  let fixture: ComponentFixture<EditUserAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
