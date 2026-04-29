import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user_id!:number;
  user:any;
  added_user:any;

  assignments!:any[];
  show_confirm_delete:boolean = false;

  show_user_deleted_succesfully:boolean = false;
  show_user_deleted_error:boolean = false;

  constructor(
    public apisService: ApisService,
    public googleService: GoogleService,
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
      this.added_user = response.data.added_user;

      console.log('this.user', this.user);
      console.log('this.assignments', this.assignments);
      console.log('this.added_user', this.added_user);
    })
  }

  gotoUsers(){
    this.router.navigate(['u/users']);
  }

  gotoProduction(production:any){
    this.router.navigate(['u/production-details/' + production.production_id]);
  }

  confirmDelete(){
    this.show_confirm_delete = true;
  }

  deleteUser(){
    console.log('delete user');
    this.googleService.DeleteUserInGoogle(this.user).subscribe((response:any) => {
      
      console.log('response', response);
      if (response.message == 'success') this.show_user_deleted_succesfully = true;
      else this.show_user_deleted_error = true;
    })
  }

  gotoEditUser(){
    this.router.navigate(['u/edit-user/' + this.user.user_id]);
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
      case 'removed':
        return 'bg-grey-100 text-grey-800 border-grey-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
  getIdentityUserClass(is_identity_user: boolean): string {
    if (is_identity_user)    return 'bg-green-100 text-green-800 border-green-200';
    else return 'bg-grey-100 text-grey-800 border-grey-200';
  }

  editAssignment(production_assignment_id:number){
    this.router.navigate(['u/edit-user-assignment/' + this.user_id + '-' + production_assignment_id])
  }

}
