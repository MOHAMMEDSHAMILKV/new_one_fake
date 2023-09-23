import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  specialGroups = environment.specialGroups
  bannerList:any = []
  languageShow:any
  constructor(private _productService: ProductService, private _messageService:MessengerService) {
    this._messageService.getSegments().subscribe((data:any)=>{
      this.specialGroups = data
    })
   }

  ngOnInit(): void {
    // let special = localStorage.getItem('specialGroup')
    // if(special !=null){
    //   this.specialGroups = special
    // }else{
    //   this.specialGroups = environment.specialGroups
    // }
    // this._productService.getHomeBanner().subscribe((data:any)=>{
    //   this.bannerList = data?.data
    //   this.bannerList.products = this.bannerList?.products?.sort((a:any, b:any) => parseFloat(a.Priorty) - parseFloat(b.Priorty))
    // })
    let language:any = localStorage.getItem('languageName')
    this.languageShow = JSON.parse(language)
  }


  specialGroup(specialGroup:any,name:any){
    this._messageService.sendSegments(specialGroup)
    this.specialGroups = specialGroup
    localStorage.setItem('specialGroup',this.specialGroups)
  }



}
