import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-executive-admin-edit-messaging-group',
  standalone: false,
  templateUrl: './executive-admin-edit-messaging-group.component.html',
  styleUrl: './executive-admin-edit-messaging-group.component.css'
})
export class ExecutiveAdminEditMessagingGroupComponent implements OnInit, OnDestroy {

  users!:any[];
  users_o!:any[];

  get_user_subscription!:Subscription;
  user:any;

  group_id!:number;
  group_name!:string;
  group_description!:string;

  group_namex!:string;
  group_descriptionx!:string;
  group:any;

  show_edit_group_name!:boolean;
  
  show_invalid_number_of_users!:boolean;
  show_invalid_group_name!:boolean;
  show_adding_group_success!:boolean;
  show_delete_group_success!:boolean;

  select_all_users!:boolean;
  messaging_groups!:any[];

  users_ids:any[] = [];

  search_query:string = '';
  user_view!:string;

  constructor(
    public apisService: ApisService,
    public authService: AuthService,
    private router:Router,
    private route: ActivatedRoute
  ){
    this.route.params.subscribe( params => {
      this.group_id = params['group_id'];

      if (this.group_id == 0) {
        this.group_name = 'GroupName';
        this.user_view = 'all';
      }
      else{
        this.user_view = 'selected';
      }
    });
  }

  ngOnInit(): void {

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          this.loadUsers();
          //this.loadGroups();
        }
        //this.loadHours();
      else this.router.navigate(['/login']);
    });

  }

  ngOnDestroy(): void {
    if(this.get_user_subscription) this.get_user_subscription.unsubscribe();
  }

  
  /*
  loadProduction(){
    this.apisService.GetProductionDetails(this.user.production_id).subscribe((data:any) => {
      //this.production = data.data.production;
      this.users = data.data.users.filter((x:any) => { return x.assignment_status == 'active'; });
      this.users_o = JSON.parse(JSON.stringify(this.users));

      //console.log('users', this.users);
      this.loadGroups();
      
    });

  }
  */
 loadUsers(){
    this.apisService.GetUsersForExecutiveAdmin(this.user.admin_id).subscribe((response:any) => {
      //console.log('users data', response);
      this.users = response.data.filter((x:any) => { return x.status == 'active'; });
      
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

  loadGroups(){
    this.apisService.GetMessagingGroups(this.user.admin_id).subscribe((response:any) => {
      this.messaging_groups = response.data;

      //console.log('*********', this.messaging_groups);

      this.messaging_groups.forEach((x:any) => {
        x.users = JSON.parse(x.users_ids);
        x.members = x.users.length;
      });


      this.group = this.messaging_groups.find((x:any) => { return x.messaging_group_id == this.group_id;});
      this.group_description = this.group.description;

      //console.log('this.group', this.group);
      if (this.group){
        this.group_name = this.group.group_name;
        var users_ids = JSON.parse(this.group.users_ids);
        this.users.forEach((x:any) => {
          x.is_selected = users_ids.indexOf(x.user_id) > -1;
        });

        //console.log('this.group', this.group);
        //console.log('this.users', this.users);
        this.users_o = JSON.parse(JSON.stringify(this.users));
        this.showByView();
      }

    })
  }
  
  toggleSelected(item:any){
    
   this.updateOriginal(item);
  }

  save(){

    //check if group has a name
    if (this.group_name == 'GroupName'){
      this.show_invalid_group_name = true;
      return;
    }

    //check that at least one user is selected
    this.users_ids = this.users.filter((x:any) => { return x.is_selected; }).map((x:any) => { return x.user_id; });
    
    if (this.users_ids.length == 0) {
      this.show_invalid_number_of_users = true;
      return;
    }

    if (this.group_id == 0) {

      var group_object = {
        admin_id: this.user.admin_id,
        users_ids: JSON.stringify(this.users_ids),
        group_name: this.group_name, 
        description: this.group_description
      }

      //console.log('group_object', group_object);
      this.apisService.AddMessagingGroup(group_object).subscribe(() => {
      this.show_adding_group_success = true;
    });
    }
    else{
      var group_objectx = {
        messaging_group_id: this.group_id,
        admin_id: this.user.admin_id,
        users_ids: JSON.stringify(this.users_ids),
        group_name: this.group_name
      }

      this.apisService.UpdateMessagingGroup(group_objectx).subscribe(() => {
      this.show_adding_group_success = true;
    });
    }

  }

  editName(){
    this.group_namex = this.group_name ? this.group_name: 'GroupName';
    this.show_edit_group_name = true;
  }

  saveGroupName(){
    this.group_name = this.group_namex;
    this.group_description = this.group_descriptionx;

    this.show_edit_group_name = false;
  }

  gotoComposeMessage(){
    this.router.navigate(['e/compose-message']);
  }

  evalAllSelected(){
    setTimeout(() => {
      if (this.select_all_users){
        this.users.forEach((x:any) => {
          x.is_selected = true;
          this.updateOriginal(x);
        });
      }
      else {
        this.users.forEach((x:any) => {
          x.is_selected = false;
          this.updateOriginal(x);
        })
      }

      //this.users_selected = this.users.filter((x:any) => { return x.is_selected;}).length > 0;
      //console.log('user_selected', this.users_selected);

    },250)
  }

  loadGroup(group_name:string){

  }

  gotoMessagingGroups(){
    this.router.navigate(['e/messaging-groups']);
  }

  gotoMessages(){
    this.router.navigate(['e/messages']);
  }

  deleteGroup(){
    this.apisService.DeleteMessagingGroup(this.group_id).subscribe(() => {
      this.show_delete_group_success = true;
    });
  }

  onSearch(){

      this.users = this.users_o.filter((x:any) => {
        var result =  
        this.search_query ? ((x.first_name + ' ' + x.last_name).toLowerCase().indexOf(this.search_query.toLowerCase()) > -1): true
        return result;
      })

  }

  clearSearch(){

    this.search_query = '';
    this.users = this.users_o;

  }

  showByView(){
    if (this.user_view == 'all') this.clearSearch();
    else {
      this.users = this.users_o.filter((x:any) => { return x.is_selected});
    }
  }

  updateOriginal(item:any){
    var usero = this.users_o.find((x:any) => { return x.user_id == item.user_id});
   if (usero) usero.is_selected == item.is_selected;
  }



}
