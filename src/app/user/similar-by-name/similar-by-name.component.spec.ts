import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarByNameComponent } from './similar-by-name.component';

describe('SimilarByNameComponent', () => {
  let component: SimilarByNameComponent;
  let fixture: ComponentFixture<SimilarByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarByNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
