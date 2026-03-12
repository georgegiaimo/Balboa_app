import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ReportsService } from '../../services/reports.service';
import { BaseChartDirective } from 'ng2-charts'; // Import from ng2-charts
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-productions-chart',
  standalone: false,
  templateUrl: './productions-chart.component.html',
  styleUrl: './productions-chart.component.css'
})
export class ProductionsChartComponent implements OnInit {

  @Input() productions!:any[];
  
  public pieChartType: 'pie' = 'pie';

  // Register the plugin here
  public pieChartPlugins = [DatalabelsPlugin];

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { 
      display: false,
      position: 'right' 
    } },
  };

  constructor(
    public reportsService: ReportsService
  ){}
  
  ngOnInit(): void {
      this.pieChartData = {
        labels: this.productions.map((x:any) => { return x.name}),
        datasets: [ { data: this.productions.map((x:any) => { return x.active_users})}],
        
      }
  }
  /*
  chartType: ChartType = 'bar';

  chartData: ChartConfiguration['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      { data: [12, 19, 3, 5, 2], label: 'Orders' }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };
  */
}


