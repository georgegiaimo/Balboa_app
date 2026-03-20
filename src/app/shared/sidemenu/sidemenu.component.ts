import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidemenu',
  standalone:false,
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  is_collapsed:boolean = false;

  constructor(
    private authService: AuthService,
    private router:Router
  ){}

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
