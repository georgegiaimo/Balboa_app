import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  standalone:false,
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent implements OnInit {

  admins!:any[];

  constructor(
    public apisService:ApisService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(){
    this.apisService.GetAdmins().subscribe((response:any) => {
      this.admins = response.data;
    })
  }

  gotoEditAdmin(admin_id:any){
    this.router.navigate(['a/edit-admin/'+ admin_id]);
  }

  getRoleClass(status: string): string {
    switch (status ? status.toLowerCase():'') {
      case 'admin':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'guest':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }
}
