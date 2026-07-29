import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GoogleService } from '../services/google.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-request-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css'
})
export class RequestPasswordResetComponent {
  private fb = inject(FormBuilder);
  
  is_loading = false;
  is_sent = false;
  errorMessage = '';

  requestChangeForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    public googleService: GoogleService,
    private router: Router
  ){}

  async onSubmit() {
    if (this.requestChangeForm.invalid) return;

    this.is_loading = true;
    this.errorMessage = '';

    try {
      // Replace with your actual AuthService call
      var response = await firstValueFrom(this.googleService.RequestPasswordChange({email: this.requestChangeForm.value.email }));
      
      //console.log('response', response);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.is_sent = true;
    } catch (err: any) {
      //console.log('error --- ', err);
      this.errorMessage = err.error?.error?.message || err.message || 'Something went wrong. Please try again.';
    } finally {
      this.is_loading = false;
    }
  }

  gotoHome(){
    this.router.navigate(['']);
  }
}