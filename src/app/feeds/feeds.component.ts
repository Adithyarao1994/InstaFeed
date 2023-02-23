import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  isReadMore : any = [false];
  results: any = {} 
  pageSize: any = 4
  @ViewChild('uiElement', { static: false }) public uiElement!: ElementRef; 

  constructor(private _service: BackendService) { }

  ngOnInit(): void {
    this.getFeeds(this.pageSize)
  }
  getFeeds(pageSize:any){                             //Function that calls the API according to pageSize 
    this._service.getFeedsFromApi(pageSize).subscribe(response =>  {
        this.results=response
        console.log('Api called')
    })

  }
  public async onScrollLoadData(){                    //Function to call the Api when you scroll (Lazy loading scroll)
    const nativeElement= this.uiElement.nativeElement
    if(nativeElement.clientHeight + Math.round(nativeElement.scrollTop) === nativeElement.scrollHeight && this.results.articles.length != this.results.totalResults){
      this.pageSize +=1
      if (this.pageSize<=30)                          //Since we need to show only 30 posts
      await this.getFeeds(this.pageSize); 
    }
  }
  readMore(index:any){                                //Function to show more texts on clicking "Read More"
      if (this.isReadMore[index]==true) {this.isReadMore[index]=false} 
      else this.isReadMore[index]=true
  }
}
