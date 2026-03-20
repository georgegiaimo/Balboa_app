import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-health',
  standalone: false,
  templateUrl: './health.component.html',
  styleUrl: './health.component.css'
})
export class HealthComponent implements OnInit {


  health_response:any;
  is_loading:boolean = true;


  constructor(
    private router: Router,
    public apisService:ApisService
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apisService.GetHealth().subscribe((response:any) => {
      //console.log('response', response);
      this.health_response = response.data;
      this.is_loading = false;
    })
  }

  gotoUsersDuplicatedByEmail(){
    this.router.navigate(['u/duplicates-by-email']);
  }

  gotoUsersDuplicatedByName(){
    this.router.navigate(['u/duplicates-by-name']);
  }

  gotoUnassignedUsers(){
    this.router.navigate(['u/unassigned-users']);
  }

  gotoInactiveUsers(){
     this.router.navigate(['u/inactive-users']);
  }

  gotoSimilarByEmail(){
     this.router.navigate(['u/similar-by-email']);
  }

  gotoSimilarByName(){
     this.router.navigate(['u/similar-by-name']);
  }

  gotoApproachingOneYear(){
    this.router.navigate(['u/approaching-one-year']);
  }

  getClass(alerts: number): string {
    if (alerts == -1) return 'bg-grey-100 text-grey-800 border-grey-200';
    else if (alerts > 0) return 'bg-red-100 text-red-800 border-red-200';
    else return 'bg-green-100 text-green-800 border-green-200';
      
  }

}
