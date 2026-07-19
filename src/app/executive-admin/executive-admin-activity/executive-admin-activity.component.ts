import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-executive-admin-activity',
  standalone:false,
  templateUrl: './executive-admin-activity.component.html',
  styleUrl: './executive-admin-activity.component.css'
})
export class ExecutiveAdminActivityComponent implements OnInit {

  is_loading:boolean = true;

  activity!:any[];

  get_user_subscription!:Subscription;
  user:any;

  constructor(
    public apisService:ApisService,
    public authService: AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          if (this.user.role == 'executive-admin') this.loadData();
          else {
            //this.authService.handleLogout();
            this.router.navigate(['/login']);
          }
        }
        //this.loadHours();
      else {
        //this.authService.handleLogout();
        this.router.navigate(['/login']);
      }
    });
    

  }

  loadData(){
    this.apisService.GetActivityForExecutiveAdmin(this.user.admin_id).subscribe((data:any) => {
      //this.production = data.data.production;
      //this.users = data.data.users;
      //this.users_o = JSON.parse(JSON.stringify(this.users));
      console.log('data ##########', data);

      //this.active_users = this.users.filter((x:any) => { return x.assignment_status == 'active'; }).length;
      //this.coordinators = data.data.coordinators;
      this.activity = data.data;
      this.processActivityData();
      //console.log('users', this.users);
      //console.log('coordinators', this.coordinators);
      //console.log('activity', this.activity);
       this.is_loading = false;

      
    });

    /*
    this.apisService.GetProductionHistory(this.user.production_id).subscribe((response:any) => {
      //console.log('response', response);
      this.history = response.data.history;
    })
    */
  }
  

  // Helper to find which param matches the {0} or {1} token
  getParam(token: string, params: any[]) {
    const index = parseInt(token.replace(/[{}]/g, ''), 10);
    return params[index];
  }

  isToken(segment: string): boolean {
    return /^\{.\}$/.test(segment);
  }

  processActivityData(){
    this.activity.forEach((x:any) => {
        x.segments = [];
        var params = JSON.parse(x.params);
        var segmentsx = x.template.split(/(\{.\})/g);
        var ctr = 0;
        segmentsx.forEach((n:any) => {
          var segment:any = {}
          segment.is_token = this.isToken(n);
          if (segment.is_token) {
            segment.param = this.getParam(n,params);
            if (segment.param.type == 'user') segment.url = '/u/user-details/' + segment.param.id;
            else if (segment.param.type == 'production') segment.url = '/u/production-details/' + segment.param.id;
          }
          else segment.text = n;
          
          segment.ctr = ctr;
          ctr += 1;
          x.segments.push(segment);
        });
      });

      //console.log('activity', this.activity);
  }
}

