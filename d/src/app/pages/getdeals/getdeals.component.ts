import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { DealsService } from 'src/app/services/deals.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-getdeals',
  templateUrl: './getdeals.component.html',
  styleUrls: ['./getdeals.component.scss']
})
export class GetdealsComponent implements OnInit {
  count = 9
  productRoute= {name:String};
  specialGroups = "bulk"
  headerSlot_3:any = []

  popular_category:any = []
  mainslot_2:any[] = []
  mainslot_3:any[] = []
  mainslot_4:any = []
  mainslot_5:any[] = []
  mainslot_6:any = []
  mainslot_7:any = []
  mainslot_8:any[] = []
  mainslot_9:any = []
  divisionLink="/division/"
  groupLink="/dealsCate/"
  constructor(private _deals:DealsService,private route: ActivatedRoute,
    private _productService: ProductService,private categoryService:CategoryService,
    private msg:MessengerService) { }

  ngOnInit(): void {
    this.productRoute ={
      name: this.route.snapshot.params['name'],
    }
    let demo:any = this.productRoute?.name
    let split = demo.split('_') 
    let name = split[0] 
    let type = split[1]
    this._deals.getDealHeaderSlotThree(this.specialGroups).subscribe((data:any)=>{
      this.headerSlot_3 = data?.data.banner
    })
    this._deals.getDealMainSlotOne(this.specialGroups).subscribe((data:any)=>{
      this.popular_category = data?.data
    })
    this._deals.getDealMainSlotTwo(type).subscribe((data:any)=>{
      this.mainslot_2 = data.data.banner
      
    })
    this._deals.getDealMainSlotThree(type).subscribe((data:any)=>{
      this.mainslot_3 = data.data.banner
    })
    this._deals.getDealMainSlotFour(type).subscribe((data:any)=>{
      this.mainslot_4 = data.data
    })
    this._deals.getDealMainSlotFive(type).subscribe((data:any)=>{
      this.mainslot_5 = data.data.banner
    })
    this._deals.getDealMainSlotSix(type).subscribe((data:any)=>{
     this.mainslot_6 = data.data
    })
    this._deals.getDealMainSlotSeven(type).subscribe((data:any)=>{
      this.mainslot_7 = data.data.banner
     })
     this._deals.getDealMainSlotEight(type).subscribe((data:any)=>{
      this.mainslot_8 = data.data.banner
     })
    this._deals.getDealMainSlotNine(type).subscribe((data:any)=>{
      this.mainslot_9 = data.data
     })
  }  

  routeTo(type:string,name:string, id:number, section:any, code:any){
    if(type === "Category"){
      // this._router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
      return `#${this.divisionLink}${name}_$_${code}_$_${section}_$_${id}_$_category`
    }else{
      if(type == 'Category'){ 
        
        // this._router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_category`
      }else{
        // this._router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_group`
      } 
    }
  }

  routeToForSpecialBanners(type:string,name:string, id:number, section:any, code:any,displayname:any){
    if(type === "Category"){
      // this._router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
      return `#${this.divisionLink}${name}_$_${code}_$_${section}_$_${id}_$_category`
    }else{
      if(type == 'Category'){ 
        // this.msg.sendPopularCate(displayname)
        // this._router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_${displayname}_$_category`
      }else{
        // this._router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
        // this.msg.sendPopularCate(displayname)
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_${displayname}_$_group`
      } 
    }
  }

}
