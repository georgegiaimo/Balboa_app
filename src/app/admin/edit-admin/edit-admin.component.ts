import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
      role: ['admin', Validators.required]
    });

    this.route.params.subscribe( params => {
      this.admin_id = params['admin_id']; 
    });
  }

  ngOnInit(): void {
    if (this.admin_id > 0) this.loadAdmin();
  }

  loadAdmin(){
    this.apisService.GetAdmin(this.admin_id).subscribe((response:any) => {
      this.admin = response.data[0];

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
        this.apisService.AddAdmin(this.adminForm.value).subscribe(() => {
          this.router.navigate(['a/admins']);
        })
      }
      else {
        this.apisService.UpdateAdmin(this.adminForm.value).subscribe(() => {
          this.router.navigate(['a/admins']);
        })
      }

    } else {
      this.adminForm.markAllAsTouched(); // Trigger all messages if they click save early
    }
  }

  gotoAdmins(){
    this.router.navigate(['a/admins']);
  }
}
