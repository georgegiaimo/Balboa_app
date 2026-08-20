import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionAdminComposeMessageComponent } from './production-admin-compose-message.component';

describe('ProductionAdminComposeMessageComponent', () => {
  let component: ProductionAdminComposeMessageComponent;
  let fixture: ComponentFixture<ProductionAdminComposeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionAdminComposeMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionAdminComposeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
