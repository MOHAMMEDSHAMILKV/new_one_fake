import { Component, OnInit } from '@angular/core';
import { BannerCategory } from 'src/app/models/banner';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  constructor(private cate:CategoryService) { }
  faqArray!:BannerCategory[]
  subIndex:any
  findData:any
  faqArray1:any=[]
  maxItems = 3;
  showAll = false;
  faqtitleIndex:any
  faqSearch:any
  ngOnInit(): void {
    this.cate.getFaqSetails().subscribe((d:any)=>{
      this.faqArray=d.data
      this.findData=this.faqArray[0].values[0]
    })
  }

  faqDes(i:any,j:any){
    this.findData=this.faqArray[i].values[j]
  }

  mouseclick(i:any){
    this.faqArray1=this.faqArray[i].values
  }

  showAllData(i:any){
    this.faqtitleIndex=i
    this.showAll=true
  }

  faqSearchData(d:any){
    this.cate.faqSearch(d).subscribe((d:any)=>{
      this.faqArray=d.data
    })
  }


}
