import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApisService } from '../../services/apis.service';
import { map, Observable, of, startWith, Subscription } from 'rxjs';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-production-admin-compose-message',
  standalone: false,
  templateUrl: './production-admin-compose-message.component.html',
  styleUrl: './production-admin-compose-message.component.css'
})
export class ProductionAdminComposeMessageComponent implements OnInit, OnDestroy {

  @ViewChild('editor')
  editor!: ElementRef<HTMLDivElement>;

  messageForm: FormGroup;

  show_sending_message:boolean = false;
  show_message_sent_succesfully:boolean = false;
  show_message_sent_error:boolean = false;

  get_user_subscription!:Subscription;
  user:any;

  messaging_groups!:any[];
  value = '';

  users:any[] = [];
  
  filteredRecipients$: Observable<any[]> = of([]);

  recipients:any[] = [];
  show_auto_complete:boolean = false;

  recipients_users:any[] = [];
  max_number:number = 12;

  constructor(
    public authService: AuthService,
    public apisService: ApisService,
    public messagingService: MessagingService,
    private fb: FormBuilder,
    private router: Router
  ){
    this.messageForm = this.fb.group({
      subject: ['', Validators.required],
      recipients: ['', []],
      message: ['', [Validators.required, Validators.minLength(40)]]
    });
  }

  ngOnInit(): void {
    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
          
          this.loadProduction();
        }
        //this.loadHours();
      else this.router.navigate(['/login']);
    });

    // Setup filtering for the production autocomplete
    this.filteredRecipients$ = this.messageForm.get('recipients')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

  }

  ngOnDestroy(): void {
    if(this.get_user_subscription) this.get_user_subscription.unsubscribe();
  }

  private _filter(value: string): string[] {
    if (!this.recipients) return [''];
    const filterValue = value.toLowerCase();
    return this.recipients.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    console.log('this.messageForm', this.messageForm);
     if (this.messageForm.valid) {

      console.log('1111');
      
      if (this.recipients_users.length == 0){
        this.messageForm.markAllAsTouched();
        return;
      }

      //send message
      var message_object = this.messageForm.value;
      message_object.recipients_ids = JSON.stringify(this.recipients_users.map((x:any) => { return x.user_id}));
      message_object.admin_name = this.user.first_name + ' ' + this.user.last_name;
      message_object.admin_email = this.user.email;
      message_object.admin_id = this.user.admin_id;

      console.log('here', message_object);

      this.messagingService.SendMessage(message_object).subscribe((response:any) => {
        console.log('response', response);
        this.show_message_sent_succesfully = true;
      });

     }
     else {
      console.log('2222');
      this.messageForm.markAllAsTouched();
      return;
    }


  }

  // Helper to check if a specific error exists
  hasError(controlName: string, errorName: string): boolean {
    const control = this.messageForm.get(controlName);
    return !!(control?.hasError(errorName) && (control.dirty || control.touched));
  }

  // General check for any error (to style borders)
  isInvalid(controlName: string): boolean {
    const control = this.messageForm.get(controlName);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  gotoMessages(){
    this.router.navigate(['p/messages']);
  }

  editGroup(group_id:number){
    this.router.navigate(['p/edit-group/' + group_id]);
  }

  loadGroups(){
    this.apisService.GetMessagingGroups(this.user.admin_id).subscribe((response:any) => {
      this.messaging_groups = response.data;
      console.log('this.messaging_groups', this.messaging_groups);

      this.messaging_groups.forEach((x:any) => {
        x.users = JSON.parse(x.users_ids);
        x.number_of_recipients = x.users.length;
        x.name = '@' + x.group_name.toLowerCase() + ' (' + x.number_of_recipients + ')';
        x.type = 'group'
      });

      var groups = this.messaging_groups;//.map((x:any) => { return '@' + x.group_name + ' (' + x.number_of_recipients + ')'});
      console.log('groups', groups);
      groups = [{
        group_name: 'everyone',
        name: '@everyone (' + this.users.length + ')',
        type: 'group'
      }].concat(groups);
      this.recipients = groups.concat(this.users);
      console.log('this.recipients', this.recipients);
    });
  }

  gotoMessagingGroups(){
    this.router.navigate(['p/messaging-groups']);
  }

  loadProduction(){
    this.apisService.GetProductionDetails(this.user.production_id).subscribe((data:any) => {
      //this.production = data.data.production;
      this.users = data.data.users.filter((x:any) => { return x.assignment_status == 'active'; });
      this.users.forEach((x:any) => {
        x.name = x.first_name + ' ' + x.last_name;
        x.type = 'user';
      });
      this.loadGroups();
      
    });
  }

  selectReceipient(item:any){
    if (item.type == 'group'){
      if (item.group_name == 'everyone'){
        this.recipients_users = JSON.parse(JSON.stringify(this.users));
      }
      else {
        this.recipients_users = this.users.filter((x:any) => { return item.users.indexOf(x.user_id) > -1});
      }
    }
    else {
      //check that is not duplicated
      var idx = this.recipients_users.map((x:any) => { return x.production_email; }).indexOf(item.production_email);
      if (idx == -1) this.recipients_users.push(item);
    }
  }

  removeSelection(item:any){
    var idx = this.recipients_users.map((x:any) => { return x.production_email; }).indexOf(item.production_email);
    if (idx > -1) this.recipients_users.splice(idx,1);
  }

  clearRecipients(){
    this.recipients_users = [];
  }

}
