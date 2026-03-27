import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-edit-coordinator',
  standalone:false,
  templateUrl: './edit-coordinator.component.html',
  styleUrl: './edit-coordinator.component.css'
})
export class EditCoordinatorComponent {
  
  coordinatorForm: FormGroup;
  coordinator_id!:number;
  coordinator:any;
  
  // Example data for autocomplete
  productions!:any[];
  filteredProductions$: Observable<string[]> = of([]);
  showAutocomplete = false;

  constructor(
    public apisService: ApisService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {

    this.coordinatorForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      is_executive: [false],
      //domain: ['', Validators.required],
      //production: ['', Validators.required],
      notes: ['']
    });

    this.route.params.subscribe( params => {
      this.coordinator_id = params['coordinator_id']; 
    });
  }

  ngOnInit() {
    // Setup filtering for the production autocomplete
    /*
    this.filteredProductions$ = this.coordinatorForm.get('production')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.loadProductions();
    */
   if (this.coordinator_id > 0) this.loadCoordinator();

  }

  loadCoordinator(){
    
    this.apisService.GetCoordinator(this.coordinator_id).subscribe((response:any) => {
      this.coordinator = response.data;
      console.log('this.coordinator', this.coordinator);

      this.coordinatorForm.patchValue(this.coordinator);

    });
  }

  loadProductions(){
      this.apisService.GetProductions().subscribe((response:any) => {
        this.productions = response.data;
      })
  }

  /*
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.name.toLowerCase().includes(filterValue)).map((x:any) => { return x.name; });
  }
  */

  selectProduction(option: string) {
    this.coordinatorForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  onSubmit() {
    if (this.coordinatorForm.valid) {
      console.log('Form Data:', this.coordinatorForm.value);
      
      if (this.coordinator_id == 0){
        /*
        var object = JSON.parse(JSON.stringify(this.coordinatorForm.value));
        
        var coordinator_object = {
          first_name: this.coordinatorForm.controls['firstName'].value,
          last_name: this.coordinatorForm.controls['lastName'].value,
          email: this.coordinatorForm.controls['personal_email'].value,
          notes: this.coordinatorForm.controls['notes'].value,
        }
        */
        this.apisService.AddCoordinator(this.coordinatorForm.value).subscribe((response:any) => {
          console.log('response', response.data);
          if (response.data){
            this.router.navigate(['a/coordinator-details/' + response.data]);
          }
          if (response.error){

          }
          //else this.router.navigate(['a/admins']);
        });
        
      }
      else {
        var object = JSON.parse(JSON.stringify(this.coordinatorForm.value));
        object.coordinator_id = this.coordinator.coordinator_id;

        this.apisService.UpdateCoordinator(object).subscribe(() => {
          this.router.navigate(['a/coordinator-details/' + this.coordinator.coordinator_id]);
        });
        
      }

    } else {
      this.coordinatorForm.markAllAsTouched();
    }
  }

  gotoCoordinators(){
    this.router.navigate(['a/coordinators'])
  }
}
