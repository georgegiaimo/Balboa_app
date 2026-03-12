import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-domains-chart',
  standalone: false,
  templateUrl: './domains-chart.component.html',
  styleUrl: './domains-chart.component.css'
})
export class DomainsChartComponent {
@Input() domains!:any[];
  
  public pieChartType: 'pie' = 'pie';

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
        labels: this.domains.map((x:any) => { return x.domain}),
        datasets: [ { data: this.domains.map((x:any) => { return x.users})}]
      }
  }
}