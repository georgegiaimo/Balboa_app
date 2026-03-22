import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoordinatorAssignmentComponent } from './edit-coordinator-assignment.component';

describe('EditCoordinatorAssignmentComponent', () => {
  let component: EditCoordinatorAssignmentComponent;
  let fixture: ComponentFixture<EditCoordinatorAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoordinatorAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoordinatorAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
