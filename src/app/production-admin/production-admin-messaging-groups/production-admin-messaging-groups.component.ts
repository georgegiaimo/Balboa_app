import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-production-admin-messaging-groups',
  standalone:false,
  templateUrl: './production-admin-messaging-groups.component.html',
  styleUrl: './production-admin-messaging-groups.component.css'
})
export class ProductionAdminMessagingGroupsComponent implements OnInit{

  messaging_groups:any[] =[];

  get_user_subscription!:Subscription;
  user:any;

  
  constructor(
    public apisService: ApisService,
    public authService: AuthService,
    private router:Router
  ){}

  ngOnInit(): void {

     this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          this.loadProduction();
        }
      else this.router.navigate(['/login']);
    });

    
  }

  loadGroups(){
    this.apisService.GetMessagingGroups(this.user.admin_id).subscribe((response:any) => {
      var groups = response.data;
      console.log('groups', groups);
      groups.forEach((x:any) => {
        x.users = JSON.parse(x.users_ids);
        x.number_of_receipients = x.users.length;
        x.group_name = '@' + x.group_name.toLowerCase();
      });

      this.messaging_groups = this.messaging_groups.concat(groups);



    })
  }

  loadProduction(){
    this.apisService.GetProductionDetails(this.user.production_id).subscribe((data:any) => {
      //this.production = data.data.production;
      var users = data.data.users.filter((x:any) => { return x.assignment_status == 'active'; });
      
      this.messaging_groups.push({
        group_name: '@everyone',
        number_of_receipients: users.length
      });
      this.loadGroups();
      
      //console.log('users', this.users);
      
    });

    /*
    this.apisService.GetProductionHistory(this.user.production_id).subscribe((response:any) => {
      //console.log('response', response);
      this.history = response.data.history;
    })
    */
  }

  gotoGroupDetails(messaging_group_id:any){
    this.router.navigate(['p/edit-group/' + messaging_group_id]);
  }

  gotoMessages(){
    this.router.navigate(['p/messages']);
  }

  gotoCompose(){
    this.router.navigate(['p/compose-message']);
  }

  gotoEditMessagingGroup(messaging_group_id:number){
    this.router.navigate(['p/edit-group/' + messaging_group_id]);
  }
}
