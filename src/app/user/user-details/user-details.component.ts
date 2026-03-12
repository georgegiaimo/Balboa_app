import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user_id!:number;
  user:any;

  assignments!:any[];

  constructor(
    public apisService: ApisService,
    private route: ActivatedRoute, 
    private router: Router
  ){
    this.route.params.subscribe( params => {
      this.user_id = params['user_id']; 
    });
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(){
    this.apisService.GetUserDetails(this.user_id).subscribe((response:any) => {
      this.user = response.data.user;
      this.assignments = response.data.assignments;

      console.log('this.assignments', this.assignments);
    })
  }

  gotoUsers(){
    this.router.navigate(['u/users']);
  }

  gotoProduction(production:any){
    this.router.navigate(['u/production-details/' + production.production_id]);
  }

  getStatusClass(status: string): string {
    switch (status ? status.toLowerCase():'') {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'writers room':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'unknown':
        return 'bg-grey-100 text-grey-800 border-grey-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

}
