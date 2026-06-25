import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminSidemenuComponent } from './production-admin-sidemenu.component';

describe('ProductionAdminSidemenuComponent', () => {
  let component: ProductionAdminSidemenuComponent;
  let fixture: ComponentFixture<ProductionAdminSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminSidemenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
