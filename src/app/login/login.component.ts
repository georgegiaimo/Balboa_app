import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  is_loading:boolean = false;
  loginForm!: FormGroup;

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
  }

  goto(route:string){
    this.router.navigate(['/u', route]);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.is_loading = true;
      // Call your backend service here...
      console.log('login data:', this.loginForm.value);

      
      this.authService.LogIn(this.loginForm.value).subscribe((response:any) => {
         console.log('response', response);
          this.is_loading = false;
         this.router.navigate(['u/dashboard']);
      })

    } else {
      // Force display of errors
      this.loginForm.markAllAsTouched();
    }
  }
}
