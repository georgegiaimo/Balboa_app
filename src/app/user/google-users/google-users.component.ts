import { Component } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-users',
  standalone:false,
  templateUrl: './google-users.component.html',
  styleUrl: './google-users.component.css'
})
export class GoogleUsersComponent {

  google_users!:any[];
  google_users_o!:any[];

  search_query!:string;

  constructor(
    public apisService:ApisService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.apisService.GetGoogleUsers().subscribe((response:any) => {
      
      try{
        this.google_users = JSON.parse(response.data[0].users);
        console.log('this.google_users', this.google_users);
      this.google_users_o = JSON.parse(JSON.stringify(this.google_users));
      }
      catch(e){
        
      }
      
      //this.google_users = response.data;
      

      /*
      this.users.forEach((x:any) => {

        var user_name = x.first_name + ' ' + x.last_name;
        x.name = user_name;

        var current_assignment = x.productions.find((n:any) => { return n.assignment_status == 'active'});
        if (current_assignment) x.assignment = current_assignment;
      });

      console.log('this.users', response.data);
      this.users_o = JSON.parse(JSON.stringify(this.users));
      */
    })
  }

  onSearch(){
    if (this.search_query.length > 0){
      this.google_users = this.google_users_o.filter((x:any) => {
        return x.name.fullName.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1;
      });
    }
    else {
      this.google_users = this.google_users_o;
    }
  }

  clearSearch(){
    this.search_query = '';
    this.google_users = this.google_users_o;
  }

  gotoUserDetails(user:any){
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

}
