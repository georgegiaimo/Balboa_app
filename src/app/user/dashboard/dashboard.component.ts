import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { GoogleService } from '../../services/google.service';
import { LogsService } from '../../services/logs.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone:false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {


  productions!:any[];
  active_productions!:any[];
  domains!:any[];
  historical_data!:any[];

  number_users!:number;
  number_productions!:number;

  last_updated!:string;
  writers_room_productions!:number;
  post_production_productions!:number;

  show_syncing_data:boolean = false;

  get_user_subscription!:Subscription;
  user:any;

  constructor(
    public reportsService: ReportsService,
    public commonService: CommonService,
    public googleService: GoogleService,
    public logsService: LogsService,
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
        this.user = currentUser;
        this.loadData();

        this.logsService.WriteToLogs({
          admin_id: this.user.admin_id,
          action: '/dashboard',
          timestamp: Date.now()
        }).subscribe();

      }
      //this.loadHours();
      else {
        console.log('@dashboard logout');
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.get_user_subscription) this.get_user_subscription.unsubscribe();
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
      this.active_productions = this.productions.filter((x:any) => { return (x.status ? x.status.toLowerCase() == 'active':false)});

      this.writers_room_productions = this.productions.filter((x:any) => { return (x.status ? x.status.toLowerCase() == 'writers room':false)}).length;
      this.post_production_productions = this.productions.filter((x:any) => { return (x.status ? x.status.toLowerCase() == 'post production':false)}).length;

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
      this.number_productions = this.productions.filter((x:any) => { return x.status ? x.status.toLowerCase() == 'active':false; }).length;
    })
  }

  syncNow(){
    this.show_syncing_data = true;

     this.logsService.WriteToLogs({
      admin_id: this.user.admin_id,
      action: 'Performed Data Sync from dashboard',
      timestamp: Date.now()
    }).subscribe();

    this.googleService.SyncData().subscribe((response:any) => {
      this.show_syncing_data = false;
      this.loadData();
    })
  }

}
