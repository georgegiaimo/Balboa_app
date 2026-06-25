import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-production-admin-sidemenu',
  standalone: false,
  templateUrl: './production-admin-sidemenu.component.html',
  styleUrl: './production-admin-sidemenu.component.css'
})
export class ProductionAdminSidemenuComponent implements OnInit{

  is_collapsed:boolean = false;
  user:any;

  get_user_subscription!:Subscription;

  constructor(
    private authService: AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
        }
        //this.loadHours();
      else this.router.navigate(['/login']);
    });
  }

  toggleSidebar(){

    this.is_collapsed = !this.is_collapsed;
  }

  goto(route:string){
    this.router.navigate([route]);
  }

  logOut(){
    this.authService.handleLogout();
    this.router.navigate([''],{ replaceUrl: true });
  }

}
