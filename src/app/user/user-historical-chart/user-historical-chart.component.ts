import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-user-historical-chart',
  standalone: false,
  templateUrl: './user-historical-chart.component.html',
  styleUrl: './user-historical-chart.component.css'
})
export class UserHistoricalChartComponent implements OnInit {

  @Input() data!:any[];

  public barChartType: ChartType = 'bar';

   public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Active Users',
        backgroundColor: '#3b82f6', // Tailwind blue-500
        hoverBackgroundColor: '#2563eb' 
      },
      { 
        data: [],  
        label: 'Productions',
        backgroundColor: '#94a3b8', // Tailwind slate-400
        hoverBackgroundColor: '#64748b'
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };


  

  ngOnInit(): void {

    console.log('historical_data', this.data);

    this.barChartData.labels = this.data.map((x:any) => { return x.date; });
    this.barChartData.datasets[0].data = this.data.map((x:any) => { return x.users; });
    this.barChartData.datasets[1].data = this.data.map((x:any) => { return x.productions; });
    
  }
}
