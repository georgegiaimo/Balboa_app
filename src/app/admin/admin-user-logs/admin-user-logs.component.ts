import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-admin-user-logs',
  standalone: false,
  templateUrl: './admin-user-logs.component.html',
  styleUrl: './admin-user-logs.component.css'
})
export class AdminUserLogsComponent implements OnInit {

  logs!:any[];
  logs_o!:any[];

  search_query!:string;

  constructor(
    public logsService:LogsService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(){
    this.logsService.GetLogs().subscribe((response:any) => {
      this.logs = response.data;
      this.logs_o = JSON.parse(JSON.stringify(response.data));
      //console.log('this.logs', this.logs);
    })
  }

  onSearch(){
    //search by name or email
    if (this.search_query.length > 0){
      this.logs = this.logs_o.filter((x:any) => {
        return (x.name.toLowerCase().indexOf(this.search_query.toLowerCase()) > -1);
      });
    }
    else {
      this.logs = this.logs_o;
    }

    //console.log('users', this.users);
  }

  clearSearch(){
    this.search_query = '';
    this.logs = this.logs_o;
  }

}
