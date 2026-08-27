import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutiveAdminRoutingModule, routingComponents } from './executive-admin-routing.module';
import { ExecutiveAdminSidemenuComponent } from './executive-admin-sidemenu/executive-admin-sidemenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    routingComponents,
    ExecutiveAdminSidemenuComponent

  ],
  imports: [
    CommonModule,
    ExecutiveAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ExecutiveAdminRoutingModule,
    SharedModule
  ]
})
export class ExecutiveAdminModule { }
