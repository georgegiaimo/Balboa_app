import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LogsService } from '../../services/logs.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sidemenu',
  standalone:false,
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent implements OnInit{

  is_collapsed:boolean = false;
  user:any;

  get_user_subscription!:Subscription;

  constructor(
    private authService: AuthService,
    private router:Router,
    public logsService: LogsService,
    public navigationService: NavigationService
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

    this.logsService.WriteToLogs({
      admin_id: this.user.admin_id,
      action: 'User logged out',
      timestamp: Date.now()
    }).subscribe();

    this.authService.handleLogout();
    this.navigationService.clearMemory();
    this.router.navigate([''],{ replaceUrl: true });
  }

}
