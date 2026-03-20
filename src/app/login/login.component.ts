import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-login',
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  is_loading:boolean = false;
  loginForm!: FormGroup;

  login_error_message!:string;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.loginForm.valueChanges
      .pipe(
        debounceTime(100),        // Wait for user to stop typing
        distinctUntilChanged()    // Only fire if the value actually changed
      )
      .subscribe(value => {
        //console.log('Form changed:', value);
        // Clear your "Login failed" alert here!
        this.login_error_message = ''; 
      });

    // Watch just the email field
    /*
    this.loginForm.get('email')?.valueChanges.subscribe(email => {
      console.log('Email is now:', email);
    });
    */
  }
  

  goto(route:string){
    this.router.navigate(['/u', route]);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.is_loading = true;
      // Call your backend service here...
      console.log('login data:', this.loginForm.value);

      
      this.authService.LogIn(this.loginForm.value).subscribe({
        next: (response:any) => {
         console.log('response', response);
         this.authService.handleLogin(response.data);
         this.is_loading = false;
        setTimeout(() => {
          this.router.navigate(['u/dashboard']);
        }, 1000);
         
      }, 
      error: (error:any) => {
        console.log('error', error);
        this.login_error_message = 'Invalid username or password';
        this.is_loading = false;
      }
    });

    } else {
      // Force display of errors
      this.loginForm.markAllAsTouched();
    }
  }

  gotoForgotPassword(){
    this.router.navigate(['forgot-password']);
  }
}
