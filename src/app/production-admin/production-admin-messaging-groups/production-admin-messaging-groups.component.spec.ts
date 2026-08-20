import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminMessagingGroupsComponent } from './production-admin-messaging-groups.component';

describe('ProductionAdminMessagingGroupsComponent', () => {
  let component: ProductionAdminMessagingGroupsComponent;
  let fixture: ComponentFixture<ProductionAdminMessagingGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminMessagingGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminMessagingGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
