import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-domain-details',
  standalone: false,
  templateUrl: './domain-details.component.html',
  styleUrl: './domain-details.component.css'
})
export class DomainDetailsComponent implements OnInit {

  domain!:string;

  users!:any[];
  productions!:any[];

  user_search_query!:string;

  constructor(
    public apisService: ApisService,
    private route:ActivatedRoute,
    private router: Router
  ){
    this.route.params.subscribe( params => {
      this.domain = params['domain']; 
    });
  }

  ngOnInit(): void {
    this.loadDomainDetails();
  }

  loadDomainDetails(){
    this.apisService.GetDomainDetails(this.domain).subscribe((response:any) => {
      this.productions = response.data.productions;
      this.users = response.data.users;

      this.productions.forEach((x:any) => {
        if (!x.status) x.status = 'unknown';
      })

      console.log('this.users', this.users);
      console.log('this.productions', this.productions);
    })
  }

  filterUsers(){

  }

  clearSearch(){

  }

  gotoHome(){
    this.router.navigate(['u/dashboard']);
  }

  gotoUserDetails(user:any){
    this.router.navigate(['u/user-details/' + user.user_id]);
  }

  gotoProductionDetails(item:any){
    this.router.navigate(['u/production-details/' + item.production_id]);
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
