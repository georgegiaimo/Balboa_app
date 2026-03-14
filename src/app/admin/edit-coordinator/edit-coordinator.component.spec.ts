import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoordinatorComponent } from './edit-coordinator.component';

describe('EditCoordinatorComponent', () => {
  let component: EditCoordinatorComponent;
  let fixture: ComponentFixture<EditCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoordinatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
