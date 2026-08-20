import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminEditMessagingGroupComponent } from './production-admin-edit-messaging-group.component';

describe('ProductionAdminEditMessagingGroupComponent', () => {
  let component: ProductionAdminEditMessagingGroupComponent;
  let fixture: ComponentFixture<ProductionAdminEditMessagingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminEditMessagingGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminEditMessagingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
