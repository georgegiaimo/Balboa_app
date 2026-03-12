import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsChartComponent } from './domains-chart.component';

describe('DomainsChartComponent', () => {
  let component: DomainsChartComponent;
  let fixture: ComponentFixture<DomainsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
