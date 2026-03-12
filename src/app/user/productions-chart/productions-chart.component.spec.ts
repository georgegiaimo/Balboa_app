import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsChartComponent } from './productions-chart.component';

describe('ProductionsChartComponent', () => {
  let component: ProductionsChartComponent;
  let fixture: ComponentFixture<ProductionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
