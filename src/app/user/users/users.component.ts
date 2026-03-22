import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users!:any[];
  users_o!:any[];

  search_query!:string;

  constructor(
    public apisService:ApisService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.apisService.GetUsers().subscribe((response:any) => {
      this.users = response.data;

      this.users.forEach((x:any) => {

        var user_name = x.first_name + ' ' + x.last_name;
        x.name = user_name;

        var current_assignment = x.productions.find((n:any) => { return n.assignment_status == 'active'});
        if (current_assignment) x.assignment = current_assignment;
      });

      console.log('this.users', response.data);
      this.users_o = JSON.parse(JSON.stringify(this.users));
    })
  }

  onSearch(){
    if (this.search_query.length > 0){
      this.users = this.users_o.filter((x:any) => {
        return x.name.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1;
      });
    }
    else {
      this.users = this.users_o;
    }
  }

  clearSearch(){
    this.search_query = '';
    this.users = this.users_o;
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
