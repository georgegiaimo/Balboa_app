import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { firstValueFrom, map, Observable, of, startWith } from 'rxjs';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-edit-production',
  standalone:false,
  templateUrl: './edit-production.component.html',
  styleUrl: './edit-production.component.css'
})
export class EditProductionComponent implements OnInit{

  productionForm!: FormGroup;
  production_id!:number;

  // Dropdown Options
  domains = ['crew-tv', 'mount22prod', 'seriescrew'];
  statuses = ['Active', 'Writers Room', 'Post Production', 'Completed', 'Paused', 'Closed', 'Canceled'];
  types = ['TV'];
  coordinators!:any[];

  filteredCoordinators$: Observable<string[]> = of([]);
  show_auto_complete_for_coordinators:boolean = false;

  production:any;

  show_production_updated_succesfully:boolean = false;
  show_production_updated_error:boolean = false;

  show_production_added_succesfully:boolean = false;
  show_production_added_error:boolean = false;

  mode!:string;

  constructor(
    public apisService:ApisService,
    public googleService:GoogleService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {

    this.route.params.subscribe( params => {
      this.production_id = params['production_id'];
    });
  
  }

  ngOnInit(): void {

    this.mode = this.production_id > 0 ? 'edit':'add';

    if (this.mode == 'edit') {
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
    }
    else {
      this.productionForm = this.fb.group({
        projectName: ['', [Validators.required, Validators.minLength(3)]],
        domain: ['crew-tv.com', Validators.required],
        notes: ['']
      });
    }

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

  async onSubmit() {
    //console.log('form valid',this.productionForm.valid);
    if (this.productionForm.valid) {
      console.log('New Production Created:', this.productionForm.value, this.productionForm.getRawValue());

      
      
      // Logic to send to your Express backend goes here
      if (this.production_id > 0){
        
        var object = {
          name: this.productionForm.getRawValue().projectName,
          type: this.productionForm.value.type,
          status: this.productionForm.value.status,
          number_of_episodes: this.productionForm.value.episodes,
          projected_end_date: this.productionForm.value.endDate,
          location: this.productionForm.value.location,
          notes: this.productionForm.value.notes,
          production_id: this.production.production_id,
          domain: this.productionForm.getRawValue().domain,
          org_unit_path: this.production.org_unit_path
        }

        var response = await firstValueFrom(this.apisService.UpdateProduction(object)); //.subscribe((response:any) => {
        console.log('response', response);

        //only update Google Workspace org unit if name changes
        console.log(object.name, this.production.name);

        if (object.name != this.production.name){
          var response2 = await firstValueFrom(this.googleService.UpdateGoogleOrgUnit(object)); //.subscribe();
          console.log('response2', response2);
        }
        
        if (response.message == 'success') this.show_production_updated_succesfully = true;
        else this.show_production_updated_error = true;
        //});

      }
      else{

        var objectx = {
          name: this.productionForm.value.projectName,
          notes: this.productionForm.value.notes,
          domain: this.productionForm.value.domain,
        }
        
        var responsex2 = await firstValueFrom(this.googleService.CreateGoogleOrgUnit(objectx)); //.subscribe();
        console.log('responsex2', responsex2);
        if(responsex2.message == 'success'){
          this.show_production_added_succesfully = true;
        }
        
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
    if (this.production) {
      this.router.navigate(['u/production-details/' + this.production.production_id]);
    }
    else {
      this.router.navigate(['u/productions']);
    }
    
  }


}
