import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatesByEmailComponent } from './duplicates-by-email.component';

describe('DuplicatesByEmailComponent', () => {
  let component: DuplicatesByEmailComponent;
  let fixture: ComponentFixture<DuplicatesByEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicatesByEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicatesByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
