import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-executive-admin-mailing',
  standalone:false,
  templateUrl: './executive-admin-mailing.component.html',
  styleUrl: './executive-admin-mailing.component.css'
})
export class ExecutiveAdminMailingComponent implements OnInit {

  search_query!:string;
  is_loading:boolean = true;

  show_user_not_found:boolean = false;

  emails!:any[];
  emails_o!:any[];

  get_user_subscription!:Subscription;
  user:any;
  production:any;

  constructor(
    public apisService: ApisService,
    public authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          if (this.user.role == 'executive-admin') this.loadData();
          else {
            this.authService.handleLogout();
            this.router.navigate(['/login']);
          }
        }
        //this.loadHours();
      else {
        this.authService.handleLogout();
        this.router.navigate(['/login']);
      }
    });

  }

  loadData(){
    
    this.apisService.GetMailingForExecutiveAdmin(this.user.admin_id).subscribe((data:any) => {
      console.log('data', data);
      this.emails = data.data;
      this.emails_o = JSON.parse(JSON.stringify(this.emails));

      //this.users = data.data.users;
      //this.users_o = JSON.parse(JSON.stringify(this.users));

      //this.active_users = this.users.filter((x:any) => { return x.assignment_status == 'active'; }).length;
      //this.coordinators = data.data.coordinators;
      //this.activity = data.data.activity;
      //this.processActivityData();
      //console.log('users', this.users);
      //console.log('coordinators', this.coordinators);
      //console.log('activity', this.activity);
      //this.loadData();
      this.is_loading = false;

      
    });

    /*
    this.apisService.GetProductionHistory(this.user.production_id).subscribe((response:any) => {
      //console.log('response', response);
      this.history = response.data.history;
    })
    */
  }

  /*
  loadData(){
    this.apisService.GetMailing().subscribe((response:any) => {
      console.log('response', response);
      this.is_loading = false;
      this.emails = response.data.filter((x:any) => { return x.org_unit_path == this.production.org_unit_path });
      this.emails_o = JSON.parse(JSON.stringify(this.emails));
    });
  }
  */
  onSearch(){
    console.log('sss');
    if (this.search_query.length == 0) this.emails = this.emails_o;
    else {
      var query = this.search_query.toLowerCase();
      this.emails = this.emails_o.filter((x: any) => { return x.name.toLowerCase().indexOf(query) > -1; });
    }
  }

  clearSearch(){
    this.search_query = '';
    this.emails = this.emails_o;
  }

  gotoUserDetails(item:any){
    if (!item.user_id) {
      this.show_user_not_found = true;
      return;
    }
    else {
      this.router.navigate(['u/user-details/' + item.user_id]);
    }
  }

}

