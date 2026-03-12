import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, startWith } from 'rxjs';

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
  productions = ['Series Crew A', 'Series Crew B', 'Production Alpha', 'Directing Team', 'Editing Bay'];
  filteredProductions$: Observable<string[]> = of([]);
  showAutocomplete = false;

  domains = ['secrew.com', 'theraloom.com', 'gmail.com'];

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute) {

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      personal_email: ['', [Validators.required, Validators.email]],
      domain: ['secrew.com', Validators.required],
      production: ['', Validators.required],
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
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productions.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectProduction(option: string) {
    this.userForm.patchValue({ production: option });
    this.showAutocomplete = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  gotoUsers(){
    this.router.navigate(['u/users'])
  }

}
