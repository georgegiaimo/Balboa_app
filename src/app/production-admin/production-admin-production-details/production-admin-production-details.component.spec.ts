import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminProductionDetailsComponent } from './production-admin-production-details.component';

describe('ProductionAdminProductionDetailsComponent', () => {
  let component: ProductionAdminProductionDetailsComponent;
  let fixture: ComponentFixture<ProductionAdminProductionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminProductionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminProductionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
