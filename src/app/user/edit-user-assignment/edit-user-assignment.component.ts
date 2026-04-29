import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { ApisService } from '../../services/apis.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-edit-user-assignment',
  standalone: false,
  templateUrl: './edit-user-assignment.component.html'
})
export class EditUserAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  production_assignment_id!:number;
  is_edit_mode: boolean = false;

  // Mock data for autocomplete
  productions_full!: any[];
  productions!: any[];
  
  filteredProductions$: Observable<any[]> = of([]);
  showAutocomplete = false;

  user_id!:number;

  show_confirm_delete:boolean = false;
  show_production_assignment_deleted_succesfully:boolean = false;
  show_production_assignment_deleted_error:boolean = false;

  production:any;
  production_assignment:any;
  user:any;

  constructor(
    public apisService: ApisService,
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.assignmentForm = this.fb.group({
      production: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['active', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get ID from route: edit-assignment/:production_assignment_id
    this.route.params.subscribe(params => {
      var key = params['key'];
      this.production_assignment_id = key.split('-')[1];
      this.user_id = key.split('-')[0]; 
      this.is_edit_mode = this.production_assignment_id > 0;

      if (this.is_edit_mode) {
        this.loadAssignmentData(this.production_assignment_id);
      }
    });

    // Setup Autocomplete Logic
    this.filteredProductions$ = this.assignmentForm.get('production')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.loadProductions();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  loadProductions(){
    this.apisService.GetProductions().subscribe((data:any) => {
      //filter removed productions
      this.productions = data.data.filter((x:any) => { return x.status ? (x.status.toLowerCase() != 'removed'):true});
      //this.productions = this.productions_full.map((x:any) => { return x.name });
      console.log('this.productions',this.productions);
    })
  }

  loadAssignmentData(id: number) {
    // Mock fetch: in a real app, call your AssignmentService here
    this.apisService.GetProductionAssignment(this.production_assignment_id).subscribe((response:any) => {
      this.production = response.data.production;
      this.production_assignment = response.data.production_assignment;
      this.user = response.data.user;
      console.log('response.data', response.data);
      //console.log('production_assignment', this.production_assignment);
      this.assignmentForm.patchValue({
        production: this.production.name,
        startDate: this.production_assignment.start_date,
        endDate: this.production_assignment.end_date,
        status: this.production_assignment.status
      });
    });
    /*
    const mockData = {
      production: 'Main Stage A',
      startDate: '2026-05-01',
      endDate: '2026-05-15',
      status: 'active'
    };
    */
    
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      console.log('Form Submitted:', this.assignmentForm.value, 'ID:', this.production_assignment_id);

      var production = this.productions.find((x:any) => { return x.name == this.assignmentForm.value['production']});
      if (!production) return;

      var object = {
        production_assignment_id: this.is_edit_mode ? this.production_assignment_id:null,
        user_id: this.user_id,
        production_id: production.production_id,
        start_date: this.assignmentForm.value['startDate'],
        end_date: this.assignmentForm.value['endDate'],
        status: this.assignmentForm.value['status']
      }

      //console.log('object', object);
      //return;

      if (this.is_edit_mode){

        this.apisService.UpdateProductionAssignment(object).subscribe(() => {
          this.router.navigate(['u/user-details/' + this.user_id]);
        })
      }

      else {
      this.apisService.AddProductionAssignment(object).subscribe(() => {
        this.router.navigate(['u/user-details/' + this.user_id]);
      });

    }

      // Navigate back after save
      this.router.navigate(['u/user-details/' + this.user_id]);
    }
  }

  selectProduction(option: string) {
    this.assignmentForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  backToUser(){
    this.router.navigate(['u/user-details/' + this.user_id]);
  }

  gotoUsers(){
    this.router.navigate(['u/users']);
  }

  confirmDelete(){
    this.show_confirm_delete = true;
  }

  deleteProductionAssignment(){
    console.log('delete assignment');
    this.apisService.DeleteProductionAssignment(this.production_assignment_id).subscribe((response:any) => {
      
      console.log('response', response);
      if (response.message == 'success') this.show_production_assignment_deleted_succesfully = true;
      else this.show_production_assignment_deleted_error = true;
    })
  }
}