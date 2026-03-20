import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproachingOneYearMarkComponent } from './approaching-one-year-mark.component';

describe('ApproachingOneYearMarkComponent', () => {
  let component: ApproachingOneYearMarkComponent;
  let fixture: ComponentFixture<ApproachingOneYearMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproachingOneYearMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproachingOneYearMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
