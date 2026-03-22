import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductionAssignmentComponent } from './edit-production-assignment.component';

describe('EditProductionAssignmentComponent', () => {
  let component: EditProductionAssignmentComponent;
  let fixture: ComponentFixture<EditProductionAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductionAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductionAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
