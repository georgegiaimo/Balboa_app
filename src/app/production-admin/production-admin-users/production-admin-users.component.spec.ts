import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminUsersComponent } from './production-admin-users.component';

describe('ProductionAdminUsersComponent', () => {
  let component: ProductionAdminUsersComponent;
  let fixture: ComponentFixture<ProductionAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
