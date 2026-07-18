import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { DocsService } from '../../services/docs.service';
import { GoogleService } from '../../services/google.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-executive-admin-production-details',
  standalone:false,
  templateUrl: './executive-admin-production-details.component.html',
  styleUrl: './executive-admin-production-details.component.css'
})
export class ExecutiveAdminProductionDetailsComponent implements OnInit, OnDestroy {

  production_id!:number;
  production:any;

  users!:any[];
  users_o!:any[];

  coordinators!:any[];
  activity!:any[];

  user_search_query!:string;
  document_status:string = 'none';
  document_url!:string;

  show_confirm_delete:boolean = false;

  show_production_deleted_succesfully:boolean = false;
  show_production_deleted_error:boolean = false;
  show_deleting_users:boolean = false;
  show_bulk_delete_success:boolean = false;
  show_bulk_delete_error:boolean = false;

  history!:any[];
  select_all_users:boolean = false;
  users_selected:boolean = false;

  delete_error!:string;

  run:any;
  runStatusInterval:any;
  selected_users!:number;

  active_users!:number;

  get_user_subscription!:Subscription;
  user:any;

  constructor(
    public apisService: ApisService,
    public docsService: DocsService,
    public googleService: GoogleService,
    public authService: AuthService,
    private route:ActivatedRoute,
    private router: Router
  ){
     this.route.params.subscribe( params => {
      this.production_id = params['production_id']; 
    });
  }

  ngOnInit(): void {

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;

          //check the user has access to this production
          var record = this.user.assignments.find((x:any) => { return x.production_id == this.production_id});
          if (record) this.loadProduction();
          else {
            this.authService.handleLogout();
            this.router.navigate(['/login']);
          }

          
        }
        //this.loadHours();
      else {
        this.authService.handleLogout();
        this.router.navigate(['/login']);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.get_user_subscription) this.get_user_subscription.unsubscribe();
  }

  loadProduction(){
    this.apisService.GetProductionDetails(this.production_id).subscribe((data:any) => {
      console.log('data', data);
      this.production = data.data.production;
      this.users = data.data.users;
      this.users_o = JSON.parse(JSON.stringify(this.users));

      this.active_users = this.users.filter((x:any) => { return x.assignment_status == 'active'; }).length;
      this.coordinators = data.data.coordinators;
      this.activity = data.data.activity;
      this.processActivityData();
      console.log('users', this.users);
      //console.log('coordinators', this.coordinators);
      //console.log('activity', this.activity);

      
    });

    this.apisService.GetProductionHistory(this.production_id).subscribe((response:any) => {
      //console.log('response', response);
      this.history = response.data.history;
    })
  }

  processActivityData(){
    this.activity.forEach((x:any) => {
        x.segments = [];
        var params = JSON.parse(x.params);
        var segmentsx = x.template.split(/(\{.\})/g);
        var ctr = 0;
        segmentsx.forEach((n:any) => {
          var segment:any = {}
          segment.is_token = this.isToken(n);
          if (segment.is_token) {
            segment.param = this.getParam(n,params);
            if (segment.param.type == 'user') segment.url = '/u/user-details/' + segment.param.id;
            else if (segment.param.type == 'production') segment.url = '/u/production-details/' + segment.param.id;
          }
          else segment.text = n;
          
          segment.ctr = ctr;
          ctr += 1;
          x.segments.push(segment);
        });
      });

      //console.log('activity', this.activity);
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
      case 'post production':
        return 'bg-gray-600 text-white border-gray-600';
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


  downloadReport(){

    if (this.document_status == 'completed' && this.document_url){
      window.open(this.document_url);
      return;
    }

    this.document_status = 'generating';
    this.docsService.GetProductionReport(this.production_id).subscribe((response:any) => {
      //console.log('response', response.data);
      this.document_status = 'completed';
      this.document_url = response.data;
      //this.saveReport(response.data);
    });
  }

  gotoEditProduction(){
    this.router.navigate(['u/edit-production/' + this.production_id]);
  }

  confirmDelete(){
    this.selected_users = this.users.filter((x:any) => { return x.is_selected; }).length;
    this.show_confirm_delete = true;

  }

  deleteProduction(){
    console.log('delete user');
    this.googleService.DeleteGoogleOrgUnit(this.production).subscribe((response:any) => {
      
      console.log('response', response);
      if (response.message == 'success') this.show_production_deleted_succesfully = true;
      else this.show_production_deleted_error = true;
    })
  }

  evalAllSelected(){
    setTimeout(() => {
      if (this.select_all_users){
        this.users.forEach((x:any) => {
          x.is_selected = true;
        });
      }
      else {
        this.users.forEach((x:any) => {
          x.is_selected = false;
        })
      }

      this.users_selected = this.users.filter((x:any) => { return x.is_selected;}).length > 0;
      console.log('user_selected', this.users_selected);

    },250)
  }

  toggleSelected(item:any){

    setTimeout(() => {
      //item.is_selected = item.is_selected ? false : true;
      this.users_selected = this.users.filter((x: any) => { return x.is_selected; }).length > 0;
      console.log('user_selected', this.users_selected);
    }, 250);
    
  }

  async deleteSelected(){

    this.show_confirm_delete = false;
    this.show_deleting_users = true;
    

    var user_ids = this.users.filter((x:any) => { return x.is_selected; }).map((x:any) => { return { user_id: x.user_id } });
    
    var responsex:any = await firstValueFrom(this.apisService.CreateBulkUploadRun());
          console.log('responsex', responsex);
          var run_id = responsex.data;
    
          console.log('run_id', run_id);
          this.startInterval(run_id);
    
    this.googleService.DeleteUsersBulk(user_ids, run_id).subscribe({
        next: (response) => {
          console.log('response', response);
          //this.show_confirm_delete = false;
          //console.log('Bulk upload complete', response);
          this.show_deleting_users = false;
          this.show_bulk_delete_success = true;
          this.loadProduction();
        },
        error: (err) => {
          console.log('responsex', err);
          
          this.delete_error = err.error.error;
          this.show_deleting_users = false;
          this.show_bulk_delete_error = true;
          //console.error('Upload failed', err)
        }
      });
  }

  startInterval(run_id:number){
    
    this.runStatusInterval = setInterval(() => {

      if (!this.show_deleting_users) clearInterval(this.runStatusInterval);
      
      this.apisService.GetBulkUploadRun(run_id).subscribe((response:any) => {
        this.run = response.data;
      });

    },3000);

  }


  
}

