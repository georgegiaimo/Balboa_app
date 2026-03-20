import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-similar-by-name',
  standalone:false,
  templateUrl: './similar-by-name.component.html',
  styleUrl: './similar-by-name.component.css'
})
export class SimilarByNameComponent {
   
  similar_users!:any[];
  is_loading:boolean = true;

  constructor(
    private router:Router,
    public apisService: ApisService
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apisService.GetSimilarUsersByName().subscribe((response:any) => {
      console.log('response', response);
      this.similar_users = response.data;
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
