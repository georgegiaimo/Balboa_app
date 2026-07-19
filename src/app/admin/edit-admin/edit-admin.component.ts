import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { AuthService } from '../../services/auth.service';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-edit-admin',
  standalone:false,
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent implements OnInit{
  
  adminForm: FormGroup;
  admin_id!:number;
  admin:any;

  productions!: any[];
    
  filteredProductions$: Observable<any[]> = of([]);
  showAutocomplete = false;

  selected_productions: any[] = [];
  show_confirm_delete:boolean = false;

  show_admin_deleted_succesfully:boolean = false;
  show_admin_deleted_error:boolean = false;

  production_assignments!:any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public apisService: ApisService
  ) {
    this.adminForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]],
      role: ['admin', Validators.required],
      production: [''],
    });

    this.route.params.subscribe( params => {
      this.admin_id = params['admin_id']; 
    });
  }

  ngOnInit(): void {
    if (this.admin_id > 0) this.loadAdmin();

    // Setup Autocomplete Logic
    this.filteredProductions$ = this.adminForm.get('production')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.loadProductions();
  }

  loadAdmin(){
    this.apisService.GetAdmin(this.admin_id).subscribe((response:any) => {
      this.admin = response.data[0];

      console.log('this.admin', this.admin);

      this.adminForm.patchValue(this.admin);

    });
  }

  // Helper to check if a specific error exists
  hasError(controlName: string, errorName: string): boolean {
    const control = this.adminForm.get(controlName);
    return !!(control?.hasError(errorName) && (control.dirty || control.touched));
  }

  // General check for any error (to style borders)
  isInvalid(controlName: string): boolean {
    const control = this.adminForm.get(controlName);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.adminForm.valid) {
      console.log('Valid Submission:', this.adminForm.value);

      if (this.admin_id == 0){
        var object = JSON.parse(JSON.stringify(this.adminForm.value));
        object.password = 'password123';
        object.status = 'invited';

        if (this.adminForm.value['role'] == 'executive-admin') object.productions = this.selected_productions;

        if (object.production) object.production_id = this.productions.find((x:any) => { return x.name == object.production}).production_id;

        this.authService.SignUp(object).subscribe((response:any) => {
          if (response.error){

          }
          else this.router.navigate(['a/admins']);
        });
      }
      else {

        console.log('this.adminForm.value', this.adminForm.value);
        var object = JSON.parse(JSON.stringify(this.adminForm.value));
        object.admin_id = this.admin_id;
        delete object.production;

        this.apisService.UpdateAdmin(object).subscribe(() => {
          this.router.navigate(['a/admins']);
        });
      }

    } else {
      this.adminForm.markAllAsTouched(); // Trigger all messages if they click save early
    }
  }

  gotoAdmins(){
    this.router.navigate(['a/admins']);
  }

  selectProduction(option: string) {
    this.adminForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addProductionToSelected(option: string) {
    //this.adminForm.patchValue({ production: option });
    //see if its not already there to avoid duplicated
    var exists = this.selected_productions.find((x:any) => { return x == option });
    if (!exists) this.selected_productions.push(option);

    console.log('this.selected_productions', this.selected_productions);
    this.showAutocomplete = false;
    this.adminForm.patchValue({ production: '' });

    //if admin is already created, create new assignment
    if (this.admin.admin_id > 0){

      //find production
      var record = this.productions.find((x:any) => { return x.name == option});
      if (record){

      this.apisService.AddExecutiveAdminProductionAssignment({
        admin_id: this.admin.admin_id,
        production_id: record.production_id 
      }).subscribe((response:any) => {
        this.loadProductions();
      })

      }
    }

  }

  loadProductions(){
    this.apisService.GetProductions().subscribe((data:any) => {
      //filter removed productions
      this.productions = data.data.filter((x:any) => { return x.status ? (x.status.toLowerCase() != 'removed'):true});
      //this.productions = this.productions_full.map((x:any) => { return x.name });
      console.log('this.productions',this.productions);

      if(this.admin.production_id){
        var productionx = this.productions.find((x:any) => { return x.production_id == this.admin.production_id; });
        this.adminForm.patchValue({production: productionx.name});
      }

      if(this.admin.role == 'executive-admin'){
        this.apisService.GetProductionsForExecutiveAdmin(this.admin.admin_id).subscribe((response:any) => {
          console.log('response', response);
          this.production_assignments = response.data;
          this.selected_productions = response.data.map((x:any) => { return x.name });
        })
      }
    })
  }

  removeSelection(item:string){
    var idx = this.selected_productions.indexOf(item);
    if (idx > -1) this.selected_productions.splice(idx,1);

    if (this.admin.admin_id > 0){
      //find production assignment record and delete it
      var record = this.production_assignments.find((x:any) => { return x.name == item;});
      this.apisService.DeleteExecutiveAdminProductionAssignment(record.exec_admin_production_assignment_id).subscribe((response:any) => {
        console.log('response', response);
      });
    }

  }

  confirmDelete(){
    this.show_confirm_delete = true;
  }

  deleteAdmin(){
    console.log('delete user');
    this.apisService.DeleteAdmin(this.admin_id).subscribe((response:any) => {
      
      console.log('response', response);
      if (response.message == 'success') this.show_admin_deleted_succesfully = true;
      else this.show_admin_deleted_error = true;
    });
  }

}
