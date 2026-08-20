import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionAdminRoutingModule, routingComponents } from './production-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductionAdminSidemenuComponent } from './production-admin-sidemenu/production-admin-sidemenu.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    routingComponents,
    ProductionAdminSidemenuComponent
  ],
  imports: [
    CommonModule,
    ProductionAdminRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ProductionAdminRoutingModule
  ]
})
export class ProductionAdminModule { }
