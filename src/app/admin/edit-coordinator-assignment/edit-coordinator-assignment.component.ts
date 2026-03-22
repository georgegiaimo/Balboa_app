import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable, of, startWith } from 'rxjs';
import { ApisService } from '../../services/apis.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-coordinator-assignment',
  standalone:false,
  templateUrl: './edit-coordinator-assignment.component.html',
  styleUrl: './edit-coordinator-assignment.component.css'
})
export class EditCoordinatorAssignmentComponent {
  coordinatorAssignmentForm: FormGroup;
  
  coordinator_assignment_id!:number;
  coordinator_id!:number;
  
  coordinator:any;
  assignment:any;
  
  // Example data for autocomplete
  productions!:any[];
  filteredProductions$: Observable<string[]> = of([]);
  showAutocomplete = false;

  constructor(
    public apisService: ApisService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {

    this.coordinatorAssignmentForm = this.fb.group({
      production: ['', Validators.required],
      status: ['active', [Validators.required]],
      notes: ['']
    });

    this.route.params.subscribe( params => {
      var keys = params['key'];
      this.coordinator_id = keys.split('-')[0]; 
      this.coordinator_assignment_id =  keys.split('-')[1];
    });
  }

  ngOnInit() {
    // Setup filtering for the production autocomplete
    
    this.filteredProductions$ = this.coordinatorAssignmentForm.get('production')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.loadProductions();
    
   if (this.coordinator_assignment_id > 0) {
    this.loadCoordinatorAssignment();
   }
   else {
    this.coordinatorAssignmentForm.get('status')?.disable();
   }
   this.loadCoordinator();

  }

  loadCoordinator(){
    this.apisService.GetCoordinator(this.coordinator_id).subscribe((data:any) => {
      console.log('data', data);
      this.coordinator = data.data;
      console.log('this.coordinator',this.coordinator);
    })
  }

  loadCoordinatorAssignment(){
    


    this.apisService.GetCoordinatorAssignment(this.coordinator_assignment_id).subscribe((response:any) => {
      
      console.log('response', response);
      this.coordinator = response.data.coordinator;
      this.assignment = response.data.coordinator_assignment;
      var production = response.data.production;

      this.coordinatorAssignmentForm.patchValue({ production: production.name });
      this.coordinatorAssignmentForm.patchValue({ notes: this.assignment.notes });
      this.coordinatorAssignmentForm.get('production')?.disable();

    });
  }

  loadProductions(){
      this.apisService.GetProductions().subscribe((response:any) => {
        this.productions = response.data;
      })
  }

  selectStatus(value: string) {
    this.coordinatorAssignmentForm.patchValue({
      status: value
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.name.toLowerCase().includes(filterValue)).map((x:any) => { return x.name; });
  }

  selectProduction(option: string) {
    this.coordinatorAssignmentForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  async onSubmit() {
    

    if (this.coordinatorAssignmentForm.valid) {
      console.log('Form Data:', this.coordinatorAssignmentForm.value);
      // Check if we have a user in our AuthService state
      const admin = await firstValueFrom(this.authService.currentUser$);
      
      if (this.coordinator_assignment_id == 0){

        //this.coordinatorAssignmentForm.patchValue({ status: 'active' });
        
        console.log('this.coordinatorAssignmentForm.value',this.coordinatorAssignmentForm.value);
        
        //get production_id
        var production = this.productions.find((x:any) => { return x.name == this.coordinatorAssignmentForm.value['production']});
        if (production){

        
            
        var coordinator_assignment_object = {
          coordinator_id: this.coordinator.coordinator_id,
          production_id: production.production_id,
          notes: this.coordinatorAssignmentForm.value['notes'],
          admin_id: admin.admin_id,
          status: 'active'
        }
        
        console.log('coordinator_assignment_object',coordinator_assignment_object);

        this.apisService.AddCoordinatorAssignment(coordinator_assignment_object).subscribe((response:any) => {
          console.log('response', response.data);
          if (response.data){
            this.router.navigate(['a/coordinator-details/' + this.coordinator.coordinator_id]);
          }
          if (response.error){

          }
          //else this.router.navigate(['a/admins']);
        });

        }
        else {
          //show error message to select production
        }
        
      }
      else {

        var coordinator_assignment_objectx = {
          coordinator_assignment_id: this.assignment.coordinator_assignment_id,
          notes: this.coordinatorAssignmentForm.value['notes'],
          admin_id: admin.admin_id,
          status: this.coordinatorAssignmentForm.value['status']
        }
      
        this.apisService.UpdateCoordinatorAssignment(coordinator_assignment_objectx).subscribe(() => {
          this.router.navigate(['a/coordinator-details/' + this.coordinator.coordinator_id]);
        });
        
      }

    } else {
      this.coordinatorAssignmentForm.markAllAsTouched();
    }
  }

  gotoCoordinators(){
    this.router.navigate(['a/coordinators'])
  }

  gotoCoordinatorDetails(){
    this.router.navigate(['a/coordinator-details/' + this.coordinator.coordinator_id])
  }
}
