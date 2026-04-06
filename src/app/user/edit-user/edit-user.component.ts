import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';
import { ApisService } from '../../services/apis.service';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-edit-user',
  standalone:false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  user_id!:number;
  
  // Example data for autocomplete
  productions!:any[];
  filteredProductions$: Observable<any[]> = of([]);
  showAutocomplete = false;

  show_user_added_succesfully:boolean = false;
  show_user_added_error:boolean = false;

  show_user_updated_succesfully:boolean = false;
  show_user_updated_error:boolean = false;

  domains = ['crew-tv', 'seriescrew', 'mount22prod'];
  user:any;

  constructor(
    public apisService: ApisService,
    public googleService: GoogleService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {

    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      personal_email: ['', [Validators.required, Validators.email]],
      domain: ['crew-tv', Validators.required],
      production: ['', Validators.required],
      is_identity_client: [false],
      notes: ['']
    });

    this.route.params.subscribe( params => {
      this.user_id = params['user_id']; 
    });
  }

  ngOnInit() {
    // Setup filtering for the production autocomplete
    this.filteredProductions$ = this.userForm.get('production')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    if (this.user_id == 0) this.loadProductions();
    else this.loadUser();

  }

  loadUser(){
    this.apisService.GetUserDetails(this.user_id).subscribe((response:any) => {
      this.user = response.data.user;
      console.log('this.user', this.user);
      console.log('assignments', response.data.assignments);

      var active_assignment = response.data.assignments.find((x:any) => { return x.assignment_status == 'active' });


       this.userForm.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        personal_email: this.user.personal_email,
        production: active_assignment ? active_assignment.name:'',
        is_identity_client: this.user.is_identity_client
       });

       this.userForm.get('production')?.disable();
       this.userForm.get('domain')?.disable();

    })
  }

  loadProductions(){
      this.apisService.GetProductions().subscribe((response:any) => {
        //this.productions = response.data.filter((x:any) => { return x.status ? x.status.toLowerCase() == 'active':false });
        this.productions = response.data;
      })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectProduction(option: string) {
    this.userForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      if (this.user_id == 0){
        //new user
        //find selected production
      var production = this.productions.find((x:any) => { return x.name == this.userForm.value.production});

      var user_data = JSON.parse(JSON.stringify(this.userForm.value));
      user_data['org_unit_path'] = production.org_unit_path;

      this.googleService.AddUserToGoogle(user_data).subscribe((response:any) => {
        console.log('response', response);
        if (response) this.show_user_added_succesfully = true;
        else this.show_user_added_error = true;
      })
      }
      else {
        //update existing user
        var user_data = JSON.parse(JSON.stringify(this.userForm.value));
        
        user_data.production_email = this.user.production_email;
        user_data.google_id = this.user.google_id;

        this.googleService.UpdateUserInGoogle(user_data).subscribe((response:any) => {
        console.log('response', response);
        if (response) this.show_user_updated_succesfully = true;
        else this.show_user_updated_error = true;

        var object = {
          user_id: this.user.user_id,
          notes: this.userForm.value.notes,
          is_identity_client: this.userForm.value.is_identity_client
        }

        this.apisService.UpdateUser(object).subscribe();

      });

      }

      
      
      
      
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  gotoUserDetails(){
    this.router.navigate(['u/user-details/' + this.user.user_id])
  }

  gotoUsers(){
    this.router.navigate(['u/users'])
  }

}
