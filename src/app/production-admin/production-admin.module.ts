import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionAdminRoutingModule, routingComponents } from './production-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductionAdminSidemenuComponent } from './production-admin-sidemenu/production-admin-sidemenu.component';


@NgModule({
  declarations: [
    routingComponents,
    ProductionAdminSidemenuComponent
  ],
  imports: [
    CommonModule,
    ProductionAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProductionAdminRoutingModule
  ]
})
export class ProductionAdminModule { }
