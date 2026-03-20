import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatesByNameComponent } from './duplicates-by-name.component';

describe('DuplicatesByNameComponent', () => {
  let component: DuplicatesByNameComponent;
  let fixture: ComponentFixture<DuplicatesByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicatesByNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicatesByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
