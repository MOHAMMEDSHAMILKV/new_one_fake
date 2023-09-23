import { Component, OnInit } from '@angular/core';
import { ProductReal, ProductRealChild } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit {
  count = 9
  popular_category: any = []
  main_slot_3:any=[]
  main_slot_4:any=[]
  main_slot_5:any ={}
  main_slot_6:any=[]
  main_slot_7:any ={}
  main_slot_8:any=[]
  
  bulkOffer:any=[]
  
  addType_5 = [
    { 
      src:'../../../assets/assets/offer.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/offer1.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/offer.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/offer1.png',
      alt:'demo'

    },
    { 
      src:'../../../assets/assets/offer1.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/offer.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/offer1.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/offer.png',
      alt:'demo'
    },
  ]
  addType_2 = [
    { 
      src:'../../../assets/assets/add-12.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/add-12.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/add-12.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/add-12.png',
      alt:'demo'
    },
  ]
  addType_1 = [
    { 
      src:'../../../assets/assets/add-13.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/add-13.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/add-13.png',
      alt:'demo'
    },
    { 
      src:'../../../assets/assets/add-13.png',
      alt:'demo'
    },
  ]
  type_1="1"
  type_2="2"
  type_3="3"
  type_4="4"
  type_5="5"

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    // this._productService.getHomeMainSlotThree().subscribe((data:any)=>{
    //   this.main_slot_3 = data.data
    //   let productList = data.data.data
    //   let newarr = productList.sort((a:any, b:any) => a.index - b.index);
    //   this.main_slot_3.data = newarr
    // })
    // this._productService.getHomeMainSlotFour().subscribe((data:any)=>{
    //   this.main_slot_4 = data.data
    //   let productList = data.data.data
    //   let newarr = productList.sort((a:any, b:any) => a.index - b.index);
    //   this.main_slot_3.data = newarr
    // })
    // this._productService.getHomeMainSlotSix().subscribe((data:any)=>{
    //   this.main_slot_6 = data.data
    //   let productList = data.data.data
    //   let newarr = productList.sort((a:any, b:any) => a.index - b.index);
    //   this.main_slot_6.data = newarr
    // })
    // this._productService.getHomeMainSlotEight().subscribe((data:any)=>{
    //   this.main_slot_8 = data.data
    //   let productList = data.data.data
    //   let newarr = productList.sort((a:any, b:any) => a.index - b.index);
    //   this.main_slot_8.data = newarr
    //   console.log(newarr);
      
    // })
    // this._productService.getHomeMainSlotFive().subscribe((data:any)=>{
    //   this.main_slot_5 = data.data
    //   let productList = data.data.data
    //   let newarr = productList.sort((a:any, b:any) => a.index - b.index);
    //   this.main_slot_5.data = newarr
    // })
    // this._productService.getHomeMainSlotSeven().subscribe((data:any)=>{
    //   this.main_slot_7 = data.data
    //   let productList = data.data.data
    //   let newarr = productList.sort((a:any, b:any) => a.index - b.index);
    //   this.main_slot_7.data = newarr
    // })
    // this.popular_category = this._productService.getPopularCategory()
    // // this._productService.getPopularCategory().subscribe((data:any)=>{
    // //   console.log(data,"popular category");
    // //   this.popular_category = data.data
    // // })
    // this._productService.getHomeMainSlotNine().subscribe((data:any)=>{
    //   this.bulkOffer = data.data.data
    //   console.log(this.bulkOffer,"__________________________");
    // })

  }


}
