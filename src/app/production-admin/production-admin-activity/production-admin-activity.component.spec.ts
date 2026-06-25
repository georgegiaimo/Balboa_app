import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminActivityComponent } from './production-admin-activity.component';

describe('ProductionAdminActivityComponent', () => {
  let component: ProductionAdminActivityComponent;
  let fixture: ComponentFixture<ProductionAdminActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
