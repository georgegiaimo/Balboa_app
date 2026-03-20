import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  
  is_loading = false;
  is_sent = false;
  errorMessage = '';

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    public authService: AuthService,
    private router: Router
  ){}

  async onSubmit() {
    if (this.forgotForm.invalid) return;

    this.is_loading = true;
    this.errorMessage = '';

    try {
      // Replace with your actual AuthService call
      await this.authService.SendResetLink({email: this.forgotForm.value.email }).subscribe();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.is_sent = true;
    } catch (err: any) {
      this.errorMessage = err.message || 'Something went wrong. Please try again.';
    } finally {
      this.is_loading = false;
    }
  }

  gotoLogin(){
    this.router.navigate(['login']);
  }
}