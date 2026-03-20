import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-duplicates-by-email',
  standalone: false,
  templateUrl: './duplicates-by-email.component.html',
  styleUrl: './duplicates-by-email.component.css'
})
export class DuplicatesByEmailComponent implements OnInit {

  duplicated_users!:any[];
  is_loading:boolean = true;

  constructor(
    private router:Router,
    public apisService: ApisService
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apisService.GetDuplicatedUsersByEmail().subscribe((response:any) => {
      console.log('response', response);
      this.duplicated_users = response.data;
      this.is_loading = false;
    })
  }

  gotoHealth(){
    this.router.navigate(['u/health']);
  }

  gotoUserDetails(user:any){
    this.router.navigate(['u/user-details/'+ user.user_id]);
  }

}
