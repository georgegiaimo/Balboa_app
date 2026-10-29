import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  pages:any = [];

  constructor() { }

  savePage(page:string, search:string, destination:string){
    var record = this.pages.find((x:any) => { return x.page == page; });

    if (record){
      record.search = search;
    }
    else {
      this.pages.push({
        page: page,
        search: search,
        destination: destination
      });
    }
  }

  getPageMemory(page:string){
    var record = this.pages.find((x:any) => { return x.page == page; });
    
    if (record){
      var idx = this.pages.map((x:any) => { return x.page}).indexOf(page);
      var recordx = JSON.parse(JSON.stringify(record));
      this.pages.splice(idx,1);
      return recordx;
    }
  }

  getPageDestinationMemory(destination:string){

    console.log('@this.pages', this.pages, destination);

    var record = this.pages.find((x:any) => { return x.destination == destination; });
    return record;
  }

  clearMemory(){
    this.pages = [];
  }

}
