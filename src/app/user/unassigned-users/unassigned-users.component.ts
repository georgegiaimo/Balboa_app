import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-unassigned-users',
  standalone: false,
  templateUrl: './unassigned-users.component.html',
  styleUrl: './unassigned-users.component.css'
})
export class UnassignedUsersComponent {

  unassigned_users!:any[];
  unassigned_users_o!:any[];

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
    this.apisService.GetUnassignedUsers().subscribe((response:any) => {
      this.unassigned_users = response.data;
      this.unassigned_users_o = JSON.parse(JSON.stringify(this.unassigned_users));
      this.is_loading = false;
    })
  }

  onSearch(){
    if (this.search_query.length > 0){
      this.unassigned_users = this.unassigned_users_o.filter((x:any) => {
        return x.name.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1;
      });
    }
    else {
      this.unassigned_users = this.unassigned_users_o;
    }
  }

  clearSearch(){
    this.search_query = '';
    this.unassigned_users = this.unassigned_users_o;
  }

  gotoUserDetails(user:any){
    this.router.navigate(['u/user-details/'+ user.user_id]);
  }

  gotoHealth(){
    this.router.navigate(['u/health']);
  }

}
