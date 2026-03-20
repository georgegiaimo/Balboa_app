import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-approaching-one-year-mark',
  standalone: false,
  templateUrl: './approaching-one-year-mark.component.html',
  styleUrl: './approaching-one-year-mark.component.css'
})
export class ApproachingOneYearMarkComponent {
  users!:any[];
  users_o!:any[];

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
    this.apisService.GetApproachingOneYear().subscribe((response:any) => {
      this.users = response.data;
      this.users_o = JSON.parse(JSON.stringify(this.users));
      this.is_loading = false;
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

  gotoHealth(){
    this.router.navigate(['u/health']);
  }

}
