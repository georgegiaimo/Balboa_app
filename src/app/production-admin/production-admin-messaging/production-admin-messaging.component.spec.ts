import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminMessagingComponent } from './production-admin-messaging.component';

describe('ProductionAdminMessagingComponent', () => {
  let component: ProductionAdminMessagingComponent;
  let fixture: ComponentFixture<ProductionAdminMessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminMessagingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
