import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ReportsService } from '../../services/reports.service';
import { BaseChartDirective } from 'ng2-charts'; // Import from ng2-charts
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-domains-chart',
  standalone: false,
  templateUrl: './domains-chart.component.html',
  styleUrl: './domains-chart.component.css'
})
export class DomainsChartComponent {
@Input() domains!:any[];
  
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
    plugins: { 
    datalabels: {
      color: '#ffffff', // Set the text color here (e.g., White)
      font: {
        weight: 'bold',
        size: 14
      },
      // Optional: Formatter to add symbols or round numbers
      /*
      formatter: (value, ctx) => {
        return value + '%'; 
      },
      */
    },
    legend: { 
      display: false,
      position: 'right' 
    } },
  };

  constructor(
    public reportsService: ReportsService
  ){}
  
  ngOnInit(): void {
      this.pieChartData = {
        labels: this.domains.map((x:any) => { return x.domain}),
        datasets: [ { data: this.domains.map((x:any) => { return x.users})}]
      }
  }
}