import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routingComponents } from './user-routing.module';
import { ProductionsChartComponent } from './productions-chart/productions-chart.component';
import { BaseChartDirective } from 'ng2-charts';
import { DomainsChartComponent } from './domains-chart/domains-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserHistoricalChartComponent } from './user-historical-chart/user-historical-chart.component';

@NgModule({
  declarations: [
    routingComponents,
    ProductionsChartComponent, 
    DomainsChartComponent,
    UserHistoricalChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    BaseChartDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
