import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  user:any;
  private timeoutId: any;
  //private readonly timeout: number = 60000; // Set timeout duration (e.g., 1 minute)
  private readonly timeout: number = 3600000; // Set timeout duration (e.g., 1 hour)
  //private readonly timeout: number = 10000; // Set timeout duration (e.g., 10 minutes)

  get_user_subscription!:Subscription;

  constructor(
    private router: Router, 
    private ngZone: NgZone,
    public authService: AuthService
  ) {
    
    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          console.log('@incativity service', this.user)
        }
      
    });
  }

  public startTracking(): void {
    this.resetTimeout();

    ['mousemove', 'keydown', 'touchstart', 'click'].forEach(event => {
      window.addEventListener(event, () => this.resetTimeout());
    });
  }

  private resetTimeout(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          this.logout();
        });
      }, this.timeout);
    });
  }

  private logout(): void {
    
    console.log('@inactivity logout');
    // Perform your logout logic here, e.g., clear tokens, navigate to login, etc.
    // Example:
    if (this.user) this.authService.handleLogout();
    this.router.navigate(['/login']);
    
  }
}