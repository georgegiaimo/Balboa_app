import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminMailingComponent } from './production-admin-mailing.component';

describe('ProductionAdminMailingComponent', () => {
  let component: ProductionAdminMailingComponent;
  let fixture: ComponentFixture<ProductionAdminMailingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminMailingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminMailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
