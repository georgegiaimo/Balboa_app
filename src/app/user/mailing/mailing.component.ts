import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mailing',
  standalone:false,
  templateUrl: './mailing.component.html',
  styleUrl: './mailing.component.css'
})
export class MailingComponent implements OnInit {

  search_query!:string;
  is_loading:boolean = true;

  show_user_not_found:boolean = false;

  emails!:any[];
  emails_o!:any[];

  constructor(
    public apisService: ApisService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apisService.GetMailing().subscribe((response:any) => {
      console.log('response', response);
      this.is_loading = false;
      this.emails = response.data;
      this.emails_o = JSON.parse(JSON.stringify(this.emails));
    });
  }

  onSearch(){
    console.log('sss');
    if (this.search_query.length == 0) this.emails = this.emails_o;
    else {
      var query = this.search_query.toLowerCase();
      this.emails = this.emails_o.filter((x: any) => { return x.name.toLowerCase().indexOf(query) > -1; });
    }
  }

  clearSearch(){
    this.search_query = '';
    this.emails = this.emails_o;
  }

  gotoUserDetails(item:any){
    if (!item.user_id) {
      this.show_user_not_found = true;
      return;
    }
    else {
      this.router.navigate(['u/user-details/' + item.user_id]);
    }
  }

}
