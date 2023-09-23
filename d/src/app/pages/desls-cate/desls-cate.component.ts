import { Component, AfterViewInit, Input, OnInit, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { CouponsService } from 'src/app/services/coupons.service';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import alphaSort from 'alpha-sort';
@Component({
  selector: 'app-desls-cate',
  templateUrl: './desls-cate.component.html',
  styleUrls: ['./desls-cate.component.scss']
})
export class DeslsCateComponent implements OnInit {
  searchCategory=""
  next:any
  totalCount =0
  pageCount:any = []
  linkToPost = ""
  activePage = 1
  productRoute= {name:String};
  categoryName = ""
  categoryProductList:any = [] 
  categoryBackProductList:any[] =[]
  categoryFilter:any = []
  filter = "all"
  rateingStar:any = 5
  filterRateOne=false
  filterRateTwo=false
  filterRateThree=false
  filterRateFour=false
  filterRateFive=false
  brandId:any = []
  offerId:any = []
  starRate:any = []
  popular_category:any=[]
  specialGroups = ""
  alphabetic:any
  count=7
  @Input() sectionTitle = "Best Product";
  @Input() currency = "AED"
  @Input() products: Product[] = []
  brandList:any =[
    {
      id:1,
      name:"Red Tape"
    },
    {
      id:2,
      name:"Crocs"
    }
  ]
  offerList:any= []
  selectedBrand:any=[]
  selectedOffer:any=[]
  customerRating:any =[]
  today = {
    sectionTitle: "Todays Deals",
    products: <any>[]
  }
  priceRange:any =[0,100]
  ProductList:any =[]
  opened = true
  filterArray:any = []
  filterGroupArray:any = []
  cartList: any
  value: number = 400;
  highValue: number = 600;
  productGroupDesignLayout:any=[]
  localArray:any=[]
  options: Options = {
    floor: 0,
    ceil: 5000
  };
  category = {
    id: 1,
    name: "Fresh Food",
    children:[
      {
        id: 1,
        name:"Vegitables",
        sub_categories: [
          {
            id: 1,
            name:"Legumes",
            product_group: [
              {
                id: 1,
                name:"Apple",
              },
              {
                id: 2,
                name: "Orange",
              },
            ]
          },
          {
            id: 2,
            name:"Legumes",
            product_group: [
              {
                id: 1,
                name:"Grapes",
              },
              {
                id: 2,
                name: "Banana",
              },
            ]
          }
        ]
      }
    ]
  }
  display_name:any
  constructor(private _coupon:CouponsService, 
    private http:HttpClient,
    private _productService: ProductService,
    private messageService: MessengerService, 
    private cart: CartService, 
    private wishList: WishlistService,
    private categoryService:CategoryService,
    private route: ActivatedRoute) {
this.messageService.getFailedData().subscribe((data:any)=>{
this.categoryProductList = data.results
this.categoryBackProductList = data.results
this.next=data.next
}) 
}

ngAfterViewInit(){
  // window.scroll(0,0)
}

ngOnInit(): void {
  this.pageCount = []
  this.productRoute ={
    name: this.route.snapshot.params['name'],
  }
  let demo:any = this.productRoute?.name
  let split = demo.split('_$_')  
  let type = split[4]
  let categoryId  = split[3]
  let categoryCode = split[0]
  this.categoryName = split[1]
  let sectionName:any=split[2]
  this.display_name=split[4]
  this.specialGroups=sectionName
  // this.categoryService.getCategorySlotOne(name,type).subscribe((data:any)=>{
  //   this.popular_category = data.data
  //   console.log(this.popular_category,"this.popular_category");
    
  //   this.popular_category.products = this.popular_category.products.sort((a:any, b:any) => parseFloat(a.Priorty) - parseFloat(b.Priorty))
    
  // })
  this._coupon.getOfferList(type,categoryId).subscribe((data:any)=>{
    this.offerList = data.data?.results
    this.offerList.filter((data:any)=>{
      let offer = {
        name: data.name,
        code: data.code,
        id:data.id,
        selected: false
      }
      this.selectedOffer.push(offer)
    })
  })
  // this.categoryService.getCategoryFilter(categoryCode).subscribe((data:any)=>{
  //   this.categoryFilter = data.data
  // })
  this.categoryService.getCategoryProductsByName(this.display_name).subscribe((data:any)=>{
    this.categoryProductList = data.data.results
    this.categoryBackProductList = data.data.results
    this.next=data.data.next
  }) 

  this.categoryService.getBrandList(categoryCode,type).subscribe((data:any)=>{
    this.brandList = data.data
    this.brandList.filter((data:any)=>{
      let brand = {
        name: data.name,
        code: data.code,
        id:data.id,
        selected: false
      }
      this.selectedBrand.push(brand)
    })
  })
  this.localArray = this.categoryProductList
  this.messageService.getPopularCate().subscribe((data:any)=>{
  })  

}
// Add To Cart
addCart(prod: any) {
  // this.messageService.requestAddToCart(prod)
}
addWishList(product: any) {
  this.messageService.RequestAddToWishList(product)
}
isWishlisted(productId: number) {
  // const productExists = this.wishList.getWishList().find((d) => d.id === productId);
  // if (productExists) return true
  // else 
  return false
}
sliderEvent(){
  let is_brand = false
  let is_rate = false
  let is_offer = false
  let is_filter =false
  if(this.brandId.length == 0){
    is_brand = false
  }else{
    is_brand = true
  }
  if(this.offerId.length == 0){
    is_offer = false
  }else{
    is_offer = true
  }
  if(this.starRate.length == 0){
    is_rate = false
  }else{
    is_rate = true
  }
  if(is_rate || is_brand || is_offer){
    is_filter = true
  }else{
    is_filter = false
  }
  this.productRoute ={
    name: this.route.snapshot.params['name'],
  }
  let demo:any = this.productRoute?.name
  let split = demo.split('_$_')  
  let type = split[4]
  let categoryCode = split[0]
  let filterData = {
    "page_type":type, 
    "type_code":categoryCode, 
    "filter_applied":is_filter, 
    "price_range":{"price_start":this.priceRange[0][0],"price_end":this.priceRange[0][1]},
    "brand_filter_applied":is_brand,
    "brand_id_list":this.brandId,
    "rating_filter_applied":is_rate,
    "rating_list":this.starRate, 
    "offer_filter_applied":is_offer, 
    "offer_line_id_list":this.offerId ,
    "alphabetic_sorting":false,
    "price_sorting":false,
    "price_sorting_type":null
  } 
  this.categoryService.allDataFilter(filterData)
}
categoryChange(e:any,name_cat:any){
  if(e.target.checked){
    let arr = this.filterArray.find((data:any) => data.name === name_cat)
    if(arr === undefined){
      let cat = {
        name: name_cat
      }
      this.filterArray.push(cat)
      cat = {
        name:""
      }
    }
  }else{
    let arr = this.filterArray.find((data: any) => data.name === name_cat)
    let cat = {
      name: name_cat
    }
    let i = this.filterArray.findIndex((d:any)=> d.name === name_cat)
    this.filterArray.splice(i, 1)
    cat = {
      name: ""
    }
  }
  let arr: any = []
  this.today.products.filter((d:any)=>{
    let name = d.productName
    this.filterArray.filter((e: any) => {
      if(name.includes(e.name)){
        arr.push(d)
      }
    })
    this.ProductList = arr
  })
  if(this.ProductList.length ==0){
    this.ProductList = this.today.products
  }
}
changeFilter(){
  if(this.filter == 'low-high'){
    this.categoryProductList = this.categoryProductList.sort((a:any, b:any) => parseFloat(a.selling_price) - parseFloat(b.selling_price));
  }
  if(this.filter == 'high-low'){
    this.categoryProductList = this.categoryProductList.sort((a:any, b:any) => parseFloat(b.selling_price) - parseFloat(a.selling_price));
  }
  if(this.filter == 'all'){
    this.categoryProductList = this.categoryBackProductList
  }
}
changeBrand(e:any,name:any){
  this.brandId = []
  this.selectedBrand.filter((data:any)=>{
    if(data.name == name){
      data.selected = e.target.checked
    }
  })
  let brandsSelected:any = {id_list:[]}
  this.selectedBrand.filter((data:any)=>{
    if(data.selected === true){
      brandsSelected.id_list.push(data.id)
      this.brandId.push(data.id)
    }
  })
  let is_brand = false
  let is_rate = false
  let is_offer = false
  let is_filter =false
  if(this.brandId.length == 0){
    is_brand = false
  }else{
    is_brand = true
  }
  if(this.offerId.length == 0){
    is_offer = false
  }else{
    is_offer = true
  }
  if(this.starRate.length == 0){
    is_rate = false
  }else{
    is_rate = true
  }
  if(is_rate || is_brand || is_offer){
    is_filter = true
  }else{
    is_filter = false
  }
  this.productRoute ={
    name: this.route.snapshot.params['name'],
  }
  let demo:any = this.productRoute?.name
  let split = demo.split('_$_')  
  let type = split[4]
  let categoryCode = split[0]
  let filterData = {
    "page_type":type, 
    "type_code":categoryCode, 
    "filter_applied":is_filter, 
    "price_range":{"price_start":this.priceRange[0][0],"price_end":this.priceRange[0][1]},
    "brand_filter_applied":is_brand,
    "brand_id_list":this.brandId,
    "rating_filter_applied":is_rate,
    "rating_list":this.starRate, 
    "offer_filter_applied":is_offer, 
    "offer_line_id_list":this.offerId,
    "alphabetic_sorting":false,
    "price_sorting":false,
    "price_sorting_type":null 
  } 
  this.categoryService.allDataFilter(filterData)
}
changeOffer(e:any,name:any){
  this.offerId = []
  this.selectedOffer.filter((data:any)=>{
    if(data.name == name){
      data.selected = e.target.checked
    }
  })
  let offerSelected:any = {id_list:[]}
  this.selectedOffer.filter((data:any)=>{
    if(data.selected === true){
      offerSelected.id_list.push(data.id)
      this.offerId.push(data.id)
    }
  })
  let is_brand = false
  let is_rate = false
  let is_offer = false
  let is_filter =false
  if(this.brandId.length == 0){
    is_brand = false
  }else{
    is_brand = true
  }
  if(this.offerId.length == 0){
    is_offer = false
  }else{
    is_offer = true
  }
  if(this.starRate.length == 0){
    is_rate = false
  }else{
    is_rate = true
  }
  if(is_rate || is_brand || is_offer){
    is_filter = true
  }else{
    is_filter = false
  }
  this.productRoute ={
    name: this.route.snapshot.params['name'],
  }
  let demo:any = this.productRoute?.name
  let split = demo.split('_$_')  
  let type = split[4]
  let categoryCode = split[0]
  let filterData = {
    "page_type":type, 
    "type_code":categoryCode, 
    "filter_applied":is_filter, 
    "price_range":{"price_start":this.priceRange[0][0],"price_end":this.priceRange[0][1]},
    "brand_filter_applied":is_brand,
    "brand_id_list":this.brandId,
    "rating_filter_applied":is_rate,
    "rating_list":this.starRate, 
    "offer_filter_applied":is_offer, 
    "offer_line_id_list":this.offerId ,
    "alphabetic_sorting":false,
    "price_sorting":false,
    "price_sorting_type":null
  } 
  this.categoryService.allDataFilter(filterData)
}
changeGroup(e:any,name:any){

}

loadMore(next:any){
  this.http.get<any>(next).subscribe((data:any)=>{
    let products = data?.data?.results
    products.filter((data:any)=>{
      this.categoryProductList.push(data)
    })
    this.next = data?.data.next
    if(data?.data.next === null){
      this.next = null
    }
  })
}

NextCahange(next:any){
  this.http.get<any>(next).subscribe((data:any)=>{
    this.categoryProductList=data?.data?.results
    this.next=data?.data
    let split = this.next.next.split('=')  
    this.activePage = split[1] - 1
  })
}

Previous(previous:any){  
  this.http.get<any>(previous).subscribe((data:any)=>{
    this.categoryProductList=data?.data?.results
    this.next=data?.data
    let split = this.next.next.split('=')  
    this.activePage = split[1] - 1
  })  
}

getThisPage(page:any){
  this.http.get<any>(this.linkToPost+'='+page).subscribe((data:any)=>{
    this.categoryProductList=data?.data?.results
    this.next=data?.data
    let split = this.next.next.split('=')
    this.activePage = split[1] - 1
  }) 
}
onCategorySearch(search:any){
  
  if(search==''){
    
  }else{
    
  }
}
changeStarFilter(){
  let star:any = JSON.parse(this.rateingStar)
  this.starRate = []
  let starFilterArray:any = []
  starFilterArray.push(star)
  this.starRate.push(star)
  let demo:any = this.productRoute?.name
  let split = demo.split('_$_')  
  let type = split[4]
  let categoryId  = split[3]
  let starData = {
    type:type,
    id:categoryId,
    rating_list:starFilterArray
  }
  this.categoryService.getProductStarBased(starData)
  setTimeout(() => {
    // let starBasedProduct = this.categoryService.getBrandBasedProduct()
    // this.categoryProductList = starBasedProduct.data.results
    // if(this.categoryProductList.length ==0){
    //   this.categoryProductList = this.categoryBackProductList
    // }

  }, 1000);
}
changeAlphbetic(e:any){
  if(e.target.checked==true){
    this.categoryProductList= this.categoryProductList.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
  }if(e.target.checked==false){
    setTimeout(() => {
      window.location.reload()
    }, 200);
  }
}

}
