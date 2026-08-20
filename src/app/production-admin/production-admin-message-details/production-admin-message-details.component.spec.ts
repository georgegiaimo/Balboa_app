import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminMessageDetailsComponent } from './production-admin-message-details.component';

describe('ProductionAdminMessageDetailsComponent', () => {
  let component: ProductionAdminMessageDetailsComponent;
  let fixture: ComponentFixture<ProductionAdminMessageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminMessageDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
