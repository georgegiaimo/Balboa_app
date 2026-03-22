import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  productions!:any[];
  domains!:any[];
  historical_data!:any[];

  number_users!:number;
  number_productions!:number;

  last_updated!:string;

  constructor(
    public reportsService: ReportsService,
    public commonService: CommonService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  gotoDomainDetails(item:any){
    this.router.navigate(['u/domain-details/' + item.domain]);
  }

  gotoProduction(item:any){
    this.router.navigate(['u/production-details/' + item.production_id]);
  }

  gotoProductions(){
    this.router.navigate(['u/productions']);
  }

  loadData(){
    this.reportsService.GetDashboardData().subscribe((response:any) => {
      this.productions = response.data.productions;
      this.domains = response.data.domains;
      this.historical_data = response.data.historical_data;

      //console.log('historical data', this.historical_data);

      //calculate number of users
      var users = 0;
      this.productions.forEach((x:any) => {
        users += x.active_users;
      });

      this.last_updated = this.commonService.getWhen(this.historical_data[this.historical_data.length-1].timestamp);

      this.number_users = users;
      this.number_productions = this.productions.filter((x:any) => { return x.status != 'removed'; }).length;
    })
  }

}
