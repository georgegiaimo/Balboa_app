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
  types = ['TV'];
  coordinators!:any[];

  filteredCoordinators$: Observable<string[]> = of([]);
  show_auto_complete_for_coordinators:boolean = false;

  constructor(
    public apisService:ApisService,
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {
    this.productionForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      domain: ['crew-tv.com', Validators.required],
      type: ['TV', Validators.required],
      coordinator: ['', Validators.required],
      endDate: ['', Validators.required],
      episodes: [1, [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadCoordinators();

    this.filteredCoordinators$ = this.productionForm.get('coordinator')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
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
    if (this.productionForm.valid) {
      console.log('New Production Created:', this.productionForm.value);
      // Logic to send to your Express backend goes here
    } else {
      this.productionForm.markAllAsTouched();
    }
  }

  isInvalid(field: string): boolean {
    const control = this.productionForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}
