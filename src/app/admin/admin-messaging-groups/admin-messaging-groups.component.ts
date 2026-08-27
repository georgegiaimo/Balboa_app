import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-messaging-groups',
  standalone:false,
  templateUrl: './admin-messaging-groups.component.html',
  styleUrl: './admin-messaging-groups.component.css'
})
export class AdminMessagingGroupsComponent implements OnInit{

  messaging_groups:any[] =[];

  get_user_subscription!:Subscription;
  user:any;

  productions!: any[];

  
  constructor(
    public apisService: ApisService,
    public authService: AuthService,
    private router:Router
  ){}

  ngOnInit(): void {

     this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          this.loadProductions();
        }
      else this.router.navigate(['/login']);
    });

    
  }

  loadGroups(){
    this.apisService.GetMessagingGroups(this.user.admin_id).subscribe((response:any) => {
      var groups = response.data;
      //console.log('groups', groups);
      groups.forEach((x:any) => {
        x.users = JSON.parse(x.users_ids);
        x.number_of_receipients = x.users.length;
        x.group_name = '@' + x.group_name.toLowerCase();
      });

      this.messaging_groups = this.messaging_groups.concat(groups);



    })
  }

  loadProductions(){
    this.apisService.GetProductions().subscribe((data:any) => {
      this.productions = data.data;
      //console.log('data', data);
      this.loadUsers();
    });
  }

  loadUsers(){
    this.apisService.GetUsers().subscribe((response:any) => {
      //console.log('users data', response);
      var users = response.data.filter((x:any) => { return x.status == 'active'; });
      this.productions.forEach((x:any) => {
        var usersx = users.filter((n:any) => { 
          return n.productions.find((m:any) => { return m.production_id == x.production_id && (m.status ? m.status.toLowerCase() == 'active':false) });
        });

        x.users = usersx;

        if (x.users.length > 0) {
          this.messaging_groups.push({
            group_name: ('@' + x.name.replace(/\s+/g, '')),
            number_of_receipients: x.users.length
          });
        }

      });
      
      /*
      this.users.forEach((x:any) => {
        x.name = x.first_name + ' ' + x.last_name;
        x.type = 'user';
      });

      console.log('this.users', this.users);
      this.loadGroups();
      */
     this.loadGroups();
    });
  }

  /*
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
  }
  */

  gotoGroupDetails(messaging_group_id:any){
    this.router.navigate(['a/edit-group/' + messaging_group_id]);
  }

  gotoMessages(){
    this.router.navigate(['a/messages']);
  }

  gotoCompose(){
    this.router.navigate(['a/compose-message']);
  }

  gotoEditMessagingGroup(messaging_group_id:number){
    this.router.navigate(['a/edit-group/' + messaging_group_id]);
  }
}
