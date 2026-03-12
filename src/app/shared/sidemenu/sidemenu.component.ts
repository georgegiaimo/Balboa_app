import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone:false,
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  is_collapsed:boolean = false;

  constructor(
    private router:Router
  ){}

  toggleSidebar(){

    this.is_collapsed = !this.is_collapsed;
  }

  goto(route:string){
    this.router.navigate([route]);
  }

}
