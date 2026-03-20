import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-similar-by-email',
  standalone: false,
  templateUrl: './similar-by-email.component.html',
  styleUrl: './similar-by-email.component.css'
})
export class SimilarByEmailComponent {
  
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
    this.apisService.GetSimilarUsersByEmail().subscribe((response:any) => {
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
