import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-execution-admin-message-details',
  standalone: false,
  templateUrl: './executive-admin-message-details.component.html',
  styleUrl: './executive-admin-message-details.component.css'
})
export class ExecutiveAdminMessageDetailsComponent implements OnInit{

  message!:any;
  individual_messages!:any[];
  

  get_user_subscription!:Subscription;
  user:any;

  composed_message_id!:number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService, 
    public apisService: ApisService
  ){
    this.route.params.subscribe( params => {
      this.composed_message_id = params['composed_message_id']; 
    });
  }

  ngOnInit(): void {

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          this.loadComposedMessage();
          //this.loadGroups();
        }
        //this.loadHours();
      else this.router.navigate(['/login']);
    });

  }

  loadComposedMessage(){
    this.apisService.LoadComposedMessageDetails(this.composed_message_id).subscribe((response:any) => {
      console.log('response', response);
      this.message = response.data.composed_message;
      this.individual_messages = response.data.individual_messages;
      console.log('this.message', this.message);
    });
  }


  gotoMessages(){
    this.router.navigate(['e/messages']);
  }

}
