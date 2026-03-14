import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit{
  
  resetForm!: FormGroup;
  isLoading = false;

  token!:string;
  page!:string;

  admin_id!:number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {

    this.route.params.subscribe( params => {
      this.token = params['token']; 
    });

  }

  ngOnInit(): void {
    
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.loadUser();

  }

  loadUser(){
    this.authService.GetAdminFromToken(this.token).subscribe((response:any) => {
      console.log('response', response);
      if (response.error) this.page = 'error';
      else {
        this.admin_id = response.data.admin_id;
        this.page = 'form';
      }
    });
  }

  // Custom validator to check if passwords are identical
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { mismatch: true } 
      : null;
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      // Call your backend service here...
      console.log('New Password:', this.resetForm.value.password);
      var object = {
        admin_id: this.admin_id,
        password: this.resetForm.value.password
      }
      this.authService.ResetPassword(object).subscribe((response:any) => {
         this.isLoading = false;
         this.page = 'success';
      })

    } else {
      // Force display of errors
      this.resetForm.markAllAsTouched();
    }
  }

  gotoLogin(){
    this.router.navigate(['login']);
  }
}