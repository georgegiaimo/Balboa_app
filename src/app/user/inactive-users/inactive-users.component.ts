import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-inactive-users',
  standalone: false,
  templateUrl: './inactive-users.component.html',
  styleUrl: './inactive-users.component.css'
})
export class InactiveUsersComponent {

  inactive_users!:any[];
  inactive_users_o!:any[];

  search_query!:string;
  is_loading:boolean = true;

  constructor(
    private router:Router,
    public apisService: ApisService
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apisService.GetInactiveUsers().subscribe((response:any) => {
      this.inactive_users = response.data;
      this.inactive_users_o = JSON.parse(JSON.stringify(this.inactive_users));
      this.is_loading = false;
    })
  }

  onSearch(){
    if (this.search_query.length > 0){
      this.inactive_users = this.inactive_users_o.filter((x:any) => {
        return x.name.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1;
      });
    }
    else {
      this.inactive_users = this.inactive_users_o;
    }
  }

  clearSearch(){
    this.search_query = '';
    this.inactive_users = this.inactive_users_o;
  }

  gotoUserDetails(user:any){
    this.router.navigate(['u/user-details/'+ user.user_id]);
  }

  gotoHealth(){
    this.router.navigate(['u/health']);
  }


}
