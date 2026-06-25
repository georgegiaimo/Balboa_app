import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminEditUserComponent } from './production-admin-edit-user.component';

describe('ProductionAdminEditUserComponent', () => {
  let component: ProductionAdminEditUserComponent;
  let fixture: ComponentFixture<ProductionAdminEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
