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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personal_email: ['', [Validators.required, Validators.email]],
      domain: ['', Validators.required],
      production: ['', Validators.required],
      notes: ['']
    });

    this.route.params.subscribe( params => {
      this.coordinator_id = params['coordinator_id']; 
    });
  }

  ngOnInit() {
    // Setup filtering for the production autocomplete
    this.filteredProductions$ = this.coordinatorForm.get('production')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.loadProductions();
    
  }

  loadProductions(){
      this.apisService.GetProductions().subscribe((response:any) => {
        this.productions = response.data;
      })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectProduction(option: string) {
    this.coordinatorForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  onSubmit() {
    if (this.coordinatorForm.valid) {
      //console.log('Form Data:', this.coordinatorForm.value);
    } else {
      this.coordinatorForm.markAllAsTouched();
    }
  }

  gotoCoordinators(){
    this.router.navigate(['a/coordinators'])
  }
}
