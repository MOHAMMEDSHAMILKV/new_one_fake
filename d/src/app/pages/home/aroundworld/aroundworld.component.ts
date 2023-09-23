import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-aroundworld',
  templateUrl: './aroundworld.component.html',
  styleUrls: ['./aroundworld.component.scss']
})
export class AroundworldComponent implements OnInit {
  count = 9
  specialGroups = "Life Style"
  productList:any=[]
  popular_category: any = []
  personal_store:any = []
  bannerList:any = []
  deals=[
    {
      title: "Best in the month !",
      path: "/demo",
      adds:[
        {
          src:"../../../assets/assets/add-2.png"
        }
      ],
      deals:[
        {
          src:"../../../assets/assets/1.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/2.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/1.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/2.png",
          item:"Antique Planter's Chair (Brown)"
        },
      ],
    },
    {
      title: "Deal of the weak!",
      path: "/demo",
      adds:[
        {
          src:"../../../assets/assets/add-2.png"
        }
      ],
      deals:[
        
        {
          src:"../../../assets/assets/1.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/2.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/1.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/2.png",
          item:"Antique Planter's Chair (Brown)"
        },
      ],
    },
    {
      title: "Best in the month !",path: "/demo",
      adds:[
        {
          src:"../../../assets/assets/add-2.png"
        }
      ],
      deals:[
        
        {
          src:"../../../assets/assets/1.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/2.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/1.png",
          item:"Antique Planter's Chair (Brown)"
        },
        {
          src:"../../../assets/assets/2.png",
          item:"Antique Planter's Chair (Brown)"
        },
      ],
    },
    {
      title: "Best in the month !",path: "/demo",
      adds: [
        {
          src: "../../../assets/assets/add-2.png"
        }
      ],
      deals: [

        {
          src: "../../../assets/assets/1.png",
          item: "Antique Planter's Chair (Brown)"
        },
        {
          src: "../../../assets/assets/2.png",
          item: "Antique Planter's Chair (Brown)"
        },
        {
          src: "../../../assets/assets/1.png",
          item: "Antique Planter's Chair (Brown)"
        },
        {
          src: "../../../assets/assets/2.png",
          item: "Antique Planter's Chair (Brown)"
        },
      ],
    }
  ]

  best={
    sectionTitle:"Best offers",
    products:<any>[]
  }
  today={
    sectionTitle:"Todays Deals",
    products:<any>[]
  }
  similar={
    sectionTitle:"Similar items from your cart",
    products:<any>[]
  }
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
    // this.bannerList = this._productService.getHomeBanner()
    // this.popular_category = this._productService.getPopularCategory()
    // this.personal_store = this._productService.getPersonalStore()
    // let products = this._productService.getProducts();
    // let best = products.filter(p => p.percentOff > 0);
    // let today = products.filter(p => p.percentOff == 0);
    // let similar = products.filter(p => p.productName == "");
    // this.best.products= best;
    // this.today.products= today;
    // this.similar.products= similar;
  }

}
