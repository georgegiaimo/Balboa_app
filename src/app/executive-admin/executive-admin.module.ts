import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutiveAdminRoutingModule, routingComponents } from './executive-admin-routing.module';
import { ExecutiveAdminSidemenuComponent } from './executive-admin-sidemenu/executive-admin-sidemenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    ExecutiveAdminRoutingModule
  ]
})
export class ExecutiveAdminModule { }
