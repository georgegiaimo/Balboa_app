import { Component } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinators',
  standalone: false,
  templateUrl: './coordinators.component.html',
  styleUrl: './coordinators.component.css'
})
export class CoordinatorsComponent {
  
  coordinators!:any[];
  coordinators_o!:any[];

  search_query!:string;

  constructor(
    public apisService:ApisService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loadCoordinators();
  }

  loadCoordinators(){
    this.apisService.GetCoordinators().subscribe((response:any) => {
      this.coordinators = response.data;
      this.coordinators_o = JSON.parse(JSON.stringify(this.coordinators));
      //console.log('coordinators', this.coordinators);
    })
  }

  gotoCoordinatorDetails(coordinator_id:any){
    this.router.navigate(['a/coordinator-details/'+ coordinator_id]);
  }

  gotoEditCoordinator(coordinator_id:any){
    this.router.navigate(['a/edit-coordinator/'+ coordinator_id]);
  }

  getStatusClass(status: string): string {
    switch (status ? status.toLowerCase():'') {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'guest':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  onSearch(){
    if (this.search_query.length > 0){
      this.coordinators = this.coordinators_o.filter((x:any) => { return (x.first_name + ' ' + x.last_name).toLowerCase().indexOf(this.search_query) > -1});
    }
    else this.coordinators = this.coordinators_o;
  }

  clearSearch(){
    this.search_query = '';
    this.coordinators = this.coordinators_o;
  }

}
