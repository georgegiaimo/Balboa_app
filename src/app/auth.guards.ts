import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  

  // Check if we have a user in our AuthService state
  const user = await firstValueFrom(authService.currentUser$);
  
  if (user) {
    return true;
  }

  
  // If not logged in, redirect to login page
  // We can also pass the 'returnUrl' so they come back here after logging in
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
};