import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productions',
  standalone: false,
  templateUrl: './productions.component.html',
  styleUrl: './productions.component.css'
})
export class ProductionsComponent implements OnInit {

  productions!:any[];
  productions_o!:any[];

  search_query:string = '';
  selected_status:string = 'All';

  sort_name_order:string = 'asc';
  sort_users_order:string = 'asc';
  sort_status_order:string = 'asc';
  sort_start_date_order:string = 'asc';

  constructor(
    private router: Router,
    public apisService: ApisService
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apisService.GetProductions().subscribe((data:any) => {
      
      //filter removed productions
      this.productions = data.data.filter((x:any) => { return x.status ? (x.status.toLowerCase() != 'removed'):true});

      //filter removed productions
      

      console.log('this.productions', this.productions);
      
      this.productions.forEach((x:any) => {
        if (!x.status) x.status = 'unknown';
      });

      this.productions_o = JSON.parse(JSON.stringify(this.productions));

      

    })
  }

  onSearch(){

      this.productions = this.productions_o.filter((x:any) => {
        var result =  
        (this.search_query ? (x.name.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1): true) &&
        (this.selected_status != 'All' ? (x.status.toLowerCase() == this.selected_status.toLowerCase()): true);

        return result;
        ;
      })

  }

  onFilter(){

  }

  clearSearch(){

    this.search_query = '';
    this.productions = this.productions_o;

  }

  gotoProductionDetails(item:any){
    this.router.navigate(['u/production-details/' + item.production_id]);
  }

  gotoEditProduction(production_id:number){
    this.router.navigate(['u/edit-production/' + production_id]);
  }

  getStatusClass(status: string): string {
    switch (status ? status.toLowerCase():'') {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'writers room':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'post production':
        return 'bg-gray-600 text-white border-gray-600';
      case 'unknown':
        return 'bg-grey-100 text-grey-800 border-grey-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  sort(field:string){
    if (field == 'name'){
      if (this.sort_name_order == 'asc') this.productions = this.productions.sort((a:any, b:any) => { return a.name.localeCompare(b.name) });
      else this.productions = this.productions.sort((a:any, b:any) => { return b.name.localeCompare(a.name) });

      this.sort_name_order = this.sort_name_order == 'asc' ? 'desc':'asc';
    }
    else if(field == 'users'){
      if (this.sort_users_order == 'asc') this.productions = this.productions.sort((a:any, b:any) => { return a.active_users - b.active_users });
      else this.productions = this.productions.sort((a:any, b:any) => { return b.active_users - a.active_users });

      this.sort_users_order = this.sort_users_order == 'asc' ? 'desc':'asc';
    }
    else if(field == 'status'){
      if (this.sort_status_order == 'asc') this.productions = this.productions.sort((a:any, b:any) => { return a.status.localeCompare(b.status) });
      else this.productions = this.productions.sort((a:any, b:any) => { return b.status.localeCompare(a.status) });

      this.sort_status_order = this.sort_status_order == 'asc' ? 'desc':'asc';
    }
    else if(field == 'start_date'){
      if (this.sort_start_date_order == 'asc') this.productions = this.productions.sort((a:any, b:any) => { return a.start_date_timestamp - b.start_date_timestamp });
      else this.productions = this.productions.sort((a:any, b:any) => { return b.start_date_timestamp - a.start_date_timestamp });

      this.sort_start_date_order = this.sort_start_date_order == 'asc' ? 'desc':'asc';
    }
  }

}
