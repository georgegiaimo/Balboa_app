import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarByEmailComponent } from './similar-by-email.component';

describe('SimilarByEmailComponent', () => {
  let component: SimilarByEmailComponent;
  let fixture: ComponentFixture<SimilarByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarByEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
