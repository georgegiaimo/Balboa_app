import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';
import { DocsService } from '../../services/docs.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GoogleService } from '../../services/google.service';
@Component({
  selector: 'app-executive-admin-users',
  standalone:false,
  templateUrl: './executive-admin-users.component.html',
  styleUrl: './executive-admin-users.component.css'
})
export class ExecutiveAdminUsersComponent implements OnInit {

  users!:any[];
  users_o!:any[];

  search_query!:string;

  show_file_upload:boolean = false;
  show_bulk_upload_success:boolean = false;
  show_bulk_upload_error:boolean = false;
  show_uploading_users:boolean = false;
  show_upload_type:boolean = false;

  upload_error!:string;

  selected_file!:File;
  run:any;
  runStatusInterval:any;
  selected_type!:string;

  get_user_subscription!:Subscription;
  user:any;
  active_users!:number;

  show_syncing_data:boolean = false;


  constructor(
    public apisService:ApisService,
    public docsService:DocsService,
    public authService:AuthService,
    public googleService: GoogleService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          if (this.user.role == 'executive-admin') this.loadData();
          else {
            //this.authService.handleLogout();
            this.router.navigate(['/login']);
          }
        }
        //this.loadHours();
      else {
        //this.authService.handleLogout();
        this.router.navigate(['/login']);
      }
    });
  }

  
  ngOnDestroy(): void {
    if (this.get_user_subscription) this.get_user_subscription.unsubscribe();
  }

  loadData(){
    this.apisService.GetUsersForExecutiveAdmin(this.user.admin_id).subscribe((data:any) => {
      
      console.log('data', data);
      this.users = data.data;

      this.users_o = JSON.parse(JSON.stringify(this.users));

    })
  }


  loadUsers(){
    this.apisService.GetUsers().subscribe((response:any) => {
      this.users = response.data;

      this.users.forEach((x:any) => {

        var user_name = x.first_name + ' ' + x.last_name;
        x.name = user_name;

        var current_assignment = x.productions.find((n:any) => { return n.assignment_status == 'active'});
        if (current_assignment) {
          x.assignment = current_assignment;
          x.status = 'active';
        }
      });

      //console.log('this.users', response.data);
      this.users_o = JSON.parse(JSON.stringify(this.users));
    })
  }

  onSearch(){
    //search by name or email
    if (this.search_query.length > 0){
      this.users = this.users_o.filter((x:any) => {
        return ((x.first_name + ' ' + x.last_name).toLowerCase().indexOf(this.search_query.toLowerCase()) > -1) || (x.personal_email.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1);
      });
    }
    else {
      this.users = this.users_o;
    }
  }

  clearSearch(){
    this.search_query = '';
    this.users = this.users_o;
  }

  gotoUserDetails(user:any){
    this.router.navigate(['u/user-details/'+ user.user_id]);
  }

  gotoEditUser(user_id:number){
    this.router.navigate(['e/edit-user/' + user_id]);
  }

  getStatusClass(status: string): string {
    switch (status ? status.toLowerCase():'') {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'writers room':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'removed':
       return 'bg-gray-100 text-gray-800 border-gray-100';
      case 'unknown':
        return 'bg-grey-100 text-grey-800 border-grey-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getIdentityUserClass(is_identity_user: boolean): string {
    if (is_identity_user)    return 'bg-green-100 text-green-800 border-green-200';
    else return 'bg-grey-100 text-grey-800 border-grey-200';
  }

  bulkUpload(){
    this.show_upload_type = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      this.selected_file = file;
    } else {
      alert('Please select a valid CSV file.');
      event.target.value = ''; // Reset input
    }
  }

  async upload() {
    if (this.selected_file) {
      this.show_file_upload = false;
      this.show_uploading_users = true;

      var responsex:any = await firstValueFrom(this.apisService.CreateBulkUploadRun());
      console.log('responsex', responsex);
      var run_id = responsex.data;

      console.log('run_id', run_id);
      this.startInterval(run_id);

      //this.fileUploaded.emit(this.selectedFile);
      console.log('send');
      this.docsService.uploadUsersFromCSV(this.selected_file, run_id, this.selected_type).subscribe({
        next: (response) => {
          console.log('response', response);
          this.show_file_upload = false;
          console.log('Bulk upload complete', response);
          this.show_uploading_users = false;
        },
        error: (err) => {
          console.log('responsex', err);
          this.show_file_upload = false;
          this.show_bulk_upload_error = true;
          this.upload_error = err.error.error;
          this.show_uploading_users = false;
          //console.error('Upload failed', err)
        }
      });
      
    }
  }

  startInterval(run_id:number){
    
    this.runStatusInterval = setInterval(() => {

      if (!this.show_uploading_users) clearInterval(this.runStatusInterval);
      
      this.apisService.GetBulkUploadRun(run_id).subscribe((response:any) => {
        this.run = response.data;
      });

    },3000);

  }

  handleNext(){
    this.show_upload_type = false;
    this.show_file_upload = true;
  }

  syncNow(){
    this.show_syncing_data = true;
    this.googleService.SyncData().subscribe((response:any) => {
      this.show_syncing_data = false;
      this.loadData();
    })
  }

}
