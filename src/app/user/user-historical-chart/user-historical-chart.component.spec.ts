import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoricalChartComponent } from './user-historical-chart.component';

describe('UserHistoricalChartComponent', () => {
  let component: UserHistoricalChartComponent;
  let fixture: ComponentFixture<UserHistoricalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHistoricalChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHistoricalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
