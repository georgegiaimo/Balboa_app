import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-production-admin-messaging',
  standalone:false,
  templateUrl: './production-admin-messaging.component.html',
  styleUrl: './production-admin-messaging.component.css'
})
export class ProductionAdminMessagingComponent implements OnInit{

  search_query!:string;
  messages:any[] = [];

   get_user_subscription!:Subscription;
    user:any;

  constructor(
    private router:Router,
    public authService: AuthService,
    public apisService: ApisService
  ){}

  ngOnInit(): void {
    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          this.loadComposedMessages();
          //this.loadGroups();
        }
        //this.loadHours();
      else this.router.navigate(['/login']);
    });
  }

  loadComposedMessages(){
    this.apisService.LoadComposedMessages(this.user.admin_id).subscribe((response:any) => {
      this.messages = response.data;
    })
  }



  gotoCompose(){
    this.router.navigate(['p/compose-message']);
  }

  gotoMessageDetails(message_id:number){
    this.router.navigate(['p/message-details/'+ message_id])
  }

  onSearch(){
    /*
    //search by name or email
    if (this.search_query.length > 0){
      this.users = this.users_o.filter((x:any) => {
        return ((x.first_name + ' ' + x.last_name).toLowerCase().indexOf(this.search_query.toLowerCase()) > -1) || (x.personal_email.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1);
      });
    }
    else {
      this.users = this.users_o;
    }
      */
  }

  clearSearch(){
    /*
    this.search_query = '';
    this.users = this.users_o;
    */
  }

}
