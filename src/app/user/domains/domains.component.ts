import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../../services/apis.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-domains',
  standalone: false,
  templateUrl: './domains.component.html',
  styleUrl: './domains.component.css'
})
export class DomainsComponent implements OnInit {

  domains!:any[];

  constructor(
    public reportsService: ReportsService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.reportsService.GetDashboardData().subscribe((response:any) => {
      this.domains = response.data.domains;
      //console.log('this.domains', this.domains, response);
    })
  }

  gotoDomainDetails(item:any){
    this.router.navigate(['u/domain-details/' + item.domain]);
  }

}
