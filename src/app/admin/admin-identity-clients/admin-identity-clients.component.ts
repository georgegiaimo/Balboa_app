import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';
import { DocsService } from '../../services/docs.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LogsService } from '../../services/logs.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-admin-identity-clients',
  standalone: false,
  templateUrl: './admin-identity-clients.component.html',
  styleUrl: './admin-identity-clients.component.css'
})
export class AdminIdentityClientsComponent implements OnInit {

  users!:any[];
  users_o!:any[];

  search_query!:string;

  show_file_upload:boolean = false;
  show_bulk_upload_success:boolean = false;
  show_bulk_upload_error:boolean = false;
  show_uploading_users:boolean = false;
  show_upload_type:boolean = false;

  upload_error!:string;

  selected_file!:File;
  run:any;
  runStatusInterval:any;
  selected_type!:string;

  get_user_subscription!:Subscription;
  user:any;

  page_memory:any;

  constructor(
    public apisService:ApisService,
    public docsService:DocsService,
    private router: Router,
    public logsService: LogsService,
    public authService: AuthService,
    public navigationService: NavigationService
  ){}

  ngOnInit(): void {
    

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
        this.user = currentUser;
        this.loadUsers();

        this.logsService.WriteToLogs({
          admin_id: this.user.admin_id,
          action: '/users',
          timestamp: Date.now()
        }).subscribe();

      }
      //this.loadHours();
      else this.router.navigate(['/login']);
    });

    this.page_memory = this.navigationService.getPageMemory(this.router.url);
  }

  ngOnDestroy(): void {
    if(this.get_user_subscription) this.get_user_subscription.unsubscribe();
  }

  loadUsers(){
    this.apisService.GetUsers().subscribe((response:any) => {
      this.users = response.data.filter((x:any) => { return x.is_identity_client});

      this.users.forEach((x:any) => {

        var user_name = x.first_name + ' ' + x.last_name;
        x.name = user_name;

        var current_assignment = x.productions.find((n:any) => { return n.assignment_status == 'active'});
        if (current_assignment) {
          x.assignment = current_assignment;
          x.status = 'active';
        }

        else {
          x.status = 'inactive';
        }
      });

      //console.log('this.users', response.data);
      this.users_o = JSON.parse(JSON.stringify(this.users));

      if (this.page_memory){
        this.search_query = this.page_memory.search;
        this.onSearch();
      }

    })
  }

  onSearch(){
    //search by name or email
    if (this.search_query.length > 0){
      this.users = this.users_o.filter((x:any) => {
        return (x.name.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1) || (x.personal_email.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1);
      });
    }
    else {
      this.users = this.users_o;
    }

    console.log('users', this.users);
  }

  clearSearch(){
    this.search_query = '';
    this.users = this.users_o;
  }

  gotoUserDetails(user:any){
    this.navigationService.savePage( this.router.url, this.search_query, '/u/user-details/'+ user.user_id);
    this.router.navigate(['u/user-details/'+ user.user_id]);
  }

  gotoEditUser(user_id:number){
    this.router.navigate(['u/edit-user/' + user_id]);
  }

  getStatusClass(status: string): string {
    switch (status ? status.toLowerCase():'') {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'writers room':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'removed':
       return 'bg-gray-100 text-gray-800 border-gray-100';
      case 'unknown':
        return 'bg-grey-100 text-grey-800 border-grey-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getIdentityUserClass(is_identity_user: boolean): string {
    if (is_identity_user)    return 'bg-green-100 text-green-800 border-green-200';
    else return 'bg-grey-100 text-grey-800 border-grey-200';
  }

  


}

