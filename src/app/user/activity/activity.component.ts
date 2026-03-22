import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-activity',
  standalone: false,
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {

  is_loading:boolean = true;

  activity!:any[];

  constructor(
    public apisService:ApisService
  ){}

  ngOnInit(): void {
    this.loadActivity();
  }

  

  // Helper to find which param matches the {0} or {1} token
  getParam(token: string, params: any[]) {
    const index = parseInt(token.replace(/[{}]/g, ''), 10);
    return params[index];
  }

  isToken(segment: string): boolean {
    return /^\{.\}$/.test(segment);
  }

  loadActivity(){
    this.apisService.GetActivity().subscribe((response:any) => {
      console.log('response', response);
      this.activity = response.data;

      this.activity.forEach((x:any) => {
        x.segments = [];
        var params = JSON.parse(x.params);
        var segmentsx = x.template.split(/(\{.\})/g);
        segmentsx.forEach((n:any) => {
          var segment:any = {}
          segment.is_token = this.isToken(n);
          if (segment.is_token) {
            segment.param = this.getParam(n,params);
            if (segment.param.type == 'user') segment.url = '/u/user-details/' + segment.param.id;
            else if (segment.param.type == 'production') segment.url = '/u/production-details/' + segment.param.id;
          }
          else segment.text = n;
          
          x.segments.push(segment);
        });
      });

      console.log('this.activity', this.activity);
      this.is_loading = false;
    })
  }
}
