import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  

getWhen(timestamp:any){
  //This function calculates difference between current time and elapsedTime and returns humanized string
  var cT = Date.now();
  var dT = cT - timestamp;

  var dTmin = Math.floor(dT/60000); //delta time minutes

  //console.log('cT', cT);
  //console.log('delta', dTmin);
  
  //if within a minute, show 'just now'
  if (dTmin < 1) return 'just now';
  else if (dTmin < 60) return dTmin + ' mins ago';
  else {
    var dThr = Math.floor(dT/3600000); //delta time hrs
    if (dThr == 1) return '1 hr ago';
    else if (dThr < 24) return dThr + ' hrs ago';
    else {
      var dTday = Math.floor(dT/86400000); //delta time days
      if (dTday == 1) return '1 day ago';
      else if (dTday < 30) return dTday + ' days ago';
      else {
        var dTmonth = Math.floor(dT/2592000000); //delta time months
        if (dTmonth == 1) return '1 month ago';
        else if (dTmonth < 12) return dTmonth + ' months ago';
        else{
          var dTyear = Math.floor(dT/31104000000); //delta time years
          if (dTyear == 1) return '1 year ago';
          else return dTyear + ' years ago';
        }
      }
    
    }
  }
}



}
