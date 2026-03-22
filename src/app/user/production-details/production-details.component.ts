import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-production-details',
  standalone: false,
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.css'
})
export class ProductionDetailsComponent implements OnInit {

  production_id!:number;
  production:any;

  users!:any[];
  users_o!:any[];

  coordinators!:any[];
  activity!:any[];

  user_search_query!:string;

  constructor(
    public apisService: ApisService,
    private route:ActivatedRoute,
    private router: Router
  ){
     this.route.params.subscribe( params => {
      this.production_id = params['production_id']; 
    });
  }

  ngOnInit(): void {
    this.loadProduction();
  }

  loadProduction(){
    this.apisService.GetProductionDetails(this.production_id).subscribe((data:any) => {
      this.production = data.data.production;
      this.users = data.data.users;
      this.users_o = JSON.parse(JSON.stringify(this.users));
      this.coordinators = data.data.coordinators;
      this.activity = data.data.activity;
      this.processActivityData();
      console.log('users', this.users);
      //console.log('coordinators', this.coordinators);
      console.log('activity', this.activity);
      
    })
  }

  processActivityData(){
    this.activity.forEach((x:any) => {
        x.segments = [];
        var params = JSON.parse(x.params);
        var segmentsx = x.template.split(/(\{.\})/g);
        segmentsx.forEach((n:any) => {
          var segment:any = {}
          segment.is_token = this.isToken(n);
          if (segment.is_token) {
            segment.param = this.getParam(n,params);
            if (segment.param.type == 'user') segment.url = '/u/user-details/' + segment.param.id;
            else if (segment.param.type == 'production') segment.url = '/u/production-details/' + segment.param.id;
          }
          else segment.text = n;
          
          x.segments.push(segment);
        });
      });
  }

  filterUsers(){
    if (this.user_search_query.length > 0){
      this.users = this.users_o.filter((x:any) => {
        var user_name = x.first_name + ' ' + x.last_name;
        return user_name.toLowerCase().indexOf(this.user_search_query.toLowerCase()) > -1;
      })
    }
  }

  clearSearch(){
    this.user_search_query = '';
    this.users = this.users_o;
  }

  gotoProductions(){
    this.router.navigate(['u/productions']);
  }

  gotoUserDetails(user:any){
    this.router.navigate(['u/user-details/' + user.user_id]);
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

  // Helper to find which param matches the {0} or {1} token
  getParam(token: string, params: any[]) {
    const index = parseInt(token.replace(/[{}]/g, ''), 10);
    return params[index];
  }

  isToken(segment: string): boolean {
    return /^\{.\}$/.test(segment);
  }

}
