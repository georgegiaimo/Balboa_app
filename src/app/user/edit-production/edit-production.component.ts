import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-edit-production',
  standalone:false,
  templateUrl: './edit-production.component.html',
  styleUrl: './edit-production.component.css'
})
export class EditProductionComponent implements OnInit{

  productionForm: FormGroup;
  production_id!:number;

  // Dropdown Options
  domains = ['crew-tv', 'mount22prod', 'seriescrew'];
  statuses = ['Active', 'Writers Room', 'Post Production', 'Completed', 'Paused', 'Canceled'];
  types = ['TV'];
  coordinators!:any[];

  filteredCoordinators$: Observable<string[]> = of([]);
  show_auto_complete_for_coordinators:boolean = false;

  production:any;

  show_production_updated_succesfully:boolean = false;
  show_production_updated_error:boolean = false;

  constructor(
    public apisService:ApisService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {

    this.productionForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      domain: ['crew-tv.com', Validators.required],
      status: ['Active'],
      type: ['TV'],
      //coordinator: ['', Validators.required],
      endDate: [''],
      episodes: [1, []],
      location: [''],
      notes: ['']
    });

    this.route.params.subscribe( params => {
      this.production_id = params['production_id']; 
    });
  

  }

  ngOnInit(): void {
    this.loadCoordinators();

    /*
    this.filteredCoordinators$ = this.productionForm.get('coordinator')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
    */

    if (this.production_id > 0) this.loadProduction();
  }

  loadProduction(){
    console.log('load production');
    this.apisService.GetProductionDetails(this.production_id).subscribe((response:any) => {
      console.log('response', response);
      this.production = response.data.production;

      //var coordinators = response.data.coordinators;


      this.productionForm.patchValue({
        projectName: this.production.name,
        domain: this.production.domain,
        status: this.production.status,
        type: this.production.type,
        episodes: this.production.number_of_episodes,
        notes: this.production.notes,
        location: this.production.location,
        endDate: this.production.projected_end_date
        //coordinator: coordinators.length > 0 ? `${coordinators[0].first_name} ${coordinators[0].last_name}`:''
       });

       this.productionForm.get('domain')?.disable();
       this.productionForm.get('projectName')?.disable();

    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.coordinators.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectCoordinator(option: string) {
    this.productionForm.patchValue({ coordinator: option });
    this.show_auto_complete_for_coordinators = false;
  }

  loadCoordinators(){
    this.apisService.GetCoordinators().subscribe((response:any) => {
      this.coordinators = response.data.map((x:any) => { return x.first_name + ' ' + x.last_name});
      //console.log('this.coordinators', this.coordinators);
    })
  }

  gotoProductions(){
    this.router.navigate(['u/productions']);
  }

  onSubmit() {
    //console.log('form valid',this.productionForm.valid);
    if (this.productionForm.valid) {
      console.log('New Production Created:', this.productionForm.value);
      // Logic to send to your Express backend goes here
      if (this.production_id > 0){
        
        var object = {
          name: this.productionForm.value.projectName,
          type: this.productionForm.value.type,
          status: this.productionForm.value.status,
          number_of_episodes: this.productionForm.value.episodes,
          projected_end_date: this.productionForm.value.endDate,
          location: this.productionForm.value.location,
          notes: this.productionForm.value.notes,
          production_id: this.production.production_id
        }

        this.apisService.UpdateProduction(object).subscribe((response:any) => {
          if (response.message == 'success') this.show_production_updated_succesfully = true;
          else this.show_production_updated_error = true;
        })

      }

    } else {
      this.productionForm.markAllAsTouched();
    }
  }

  isInvalid(field: string): boolean {
    const control = this.productionForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  gotoProductionDetails(){
    this.router.navigate(['u/production-details/' + this.production.production_id])
  }


}
