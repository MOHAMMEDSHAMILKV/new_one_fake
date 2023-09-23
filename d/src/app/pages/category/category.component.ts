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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import alphaSort from 'alpha-sort';
import UIkit from 'uikit';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  productRoute= {name:String};
  next:any
  totalCount =0
  pageCount:any = []
  linkToPost = ""
  activePage = 1
  searchResultList:any=[]
  searchBackResultList:any[] =[]
  searchValue = ""
  filter = "all"
  isBrand=true
  isBrand1=false
  searchData:any
  brandArray:any=[
  ]
  brandArrayDuplicate:any=[]

  price:any=[
    {"price":"Under AED 299"},
    {"price":"Rs.299 to 1299"},
    {"price":"Rs.1299 to 2500"},
    {"price":"Rs.1299 to 2500"},
    {"price":"Rs.2000 to 2299"},
    {"price":"Above 2299"}
  ]

  cartProductImage:any=[
    {"image1":"../../../assets/products/prod1.svg"},
    {"image1":"../../../assets/products/prod2.svg"},
    {"image1":"../../../assets/products/prod3.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
  ] 
isPrice1=true
  isPrice=true
  isColor=true
  page_type:any
  type_code:any
  brandListArrayId:any=[]
  barndNameArray:any=[]
  brandNameId:any
  is_brand=false
  is_price=false
  filter_applied=false
  price_ngmodal:any
  priceListArray=[
    {"name":"below 10","start":"1","end":"10"},
    {"name":"10-50","start":"10","end":"50"},
    {"name":"50-100","start":"50","end":"100"},
    {"name":"100-500","start":"100","end":"500"},
    {"name":"More than 500","start":"500","end":"1000"}
  ]

  sortArray:any=[
    {"name":"Default","value":"default"},
    {"name":"Low to High","value":"low_to_high"},
    {"name":"High to Low","value":"high_to_low"},
    {"name":"Alphabetic","value":"alphabetic"},
  ]

  filterRes:any=[]
  priceArray:any=[]
  sortActive=false
  isSortActive:any=0
  printedGroup:any
  priceIndex:any
  paginationIsActive=false
  paginationDetails:any
  isFilterPageActive=false
  priceSortName:any
  alphabeticeIsActive=false
  priceSortIsActive=false
  isLoading=false
  specialGroup:any
  constructor(
      private http:HttpClient,
      private route: ActivatedRoute,
      private categoryService:CategoryService,
      private messageService: MessengerService,
      private _productService: ProductService
){}

  ngAfterViewInit(){
    // window.scroll(0,0)
  }

  ngOnInit(): void {
    this.pageCount = []
    this.searchValue = ""
    this.isLoading=true
    this.route.params.subscribe((data:any)=>{
      this.searchValue = ""
      this.productRoute ={
        name: this.route.snapshot.params['data'],
      }
      this.searchData=data.name
      let demo:any = this.productRoute?.name
      let split = demo.split('_$_')
      this.type_code = split[0]
      this.page_type = split[1]
      this.printedGroup=split[2]
      this.specialGroup=split[3]
      let res:any={
        type_code:this.type_code,
        page_type:this.page_type,
        segment_code:this.specialGroup
      } 
      this.categoryService.getCategoryProduct(res)
      this.messageService.get().subscribe((d:any)=>{
        this.isLoading=false
        this.paginationDetails=d
          if(d?.next!=null){
            this.paginationIsActive=true
          }
          this.searchResultList=d?.results
      }) 
      this.categoryService.getBrand(this.type_code,this.page_type).subscribe((data:any)=>{
          this.brandArray=data.data?.results
          this.brandArrayDuplicate=data.data?.results
      })

      //   this.categoryService.getGroup(searchData).subscribe((data:any)=>{
      //     console.log(data.data);
      // })

    }) 
  }
 
  Apply_filter(){
    UIkit.modal('#uk-flex-top').hide();
  }
  brandSelect(){
    this.isBrand=!this.isBrand
  }
  Priceselct(){
    this.isPrice=!this.isPrice
   
  }
  brandSelect1(){
    this.isBrand1=!this.isBrand1
    this.isPrice1=true
    // if(this.isBrand1=true){
    //   this.isPrice1=false
    // }
  }
  Priceselct1(){
      this.isPrice1=!this.isPrice1
      this.isBrand1=true
    // if(this.isPrice1=true){
    //   this.isBrand1=false
    // }
  }

  colorSelect(){
    this.isColor=!this.isColor
  }

  arrayBrand(id:any){
    this.brandListArrayId.push(id)
  }

  barndName(data:any){
    this.barndNameArray.push(data)
  }
  brandArraydelete(i:any){
    this.barndNameArray.splice(i,1)
  }

  filterDate(e:any,name:any,id:any,brandName:any,i:any,start:any,end:any){
    let pricefull={}
    if(name=='brand'){
      if(e.target.checked==true){
        this.is_brand=true  
        this.arrayBrand(id) 
        this.filter_applied=true 
        let data={
          name:brandName,
          id:id,
          index:i
        } 
        this.brandNameId=i
        this.barndName(data)
        
      }else{
        let a:any=this.barndNameArray.findIndex((d:any)=>d.name==brandName)
        this.barndNameArray.splice(a,1)
        this.brandListArrayId.splice(a,1)
        if(this.brandListArrayId.length==0){
          this.filter_applied=false 
          this.is_brand=false
        }
      } 
      this.filterRes={
          attribute_filter_applied: null,    
          attribute_code_list: null,    
          brand_filter_applied:this.is_brand,    
          brand_id_list:this.brandListArrayId,    
          filter_applied:this.filter_applied,    
          offer_filter_applied: false,    
          offer_line_id_list: [],    
          page_type: this.page_type,    
          type_code: this.type_code,    
          price_range:this.priceArray,  
          rating_filter_applied: false,    
          rating_list: [],    
          alphabetic_sorting:this.alphabeticeIsActive,    
          price_sorting:this.priceSortIsActive,    
          price_sorting_type:this.priceSortName,
          segment_code:this.specialGroup
      }
      this.categoryService.getFilterProduct(this.filterRes)
      this.messageService.getFilter().subscribe((data:any)=>{
        this.searchResultList=data.results
        this.paginationDetails=data
        if(this.paginationDetails?.next==null){
          this.isFilterPageActive=true
          this.paginationIsActive=false 
          // alert("working1")
        }
         else if(this.brandListArrayId.length==0&&this.priceArray.length==0){
          this.isFilterPageActive=true
          this.paginationIsActive=false 
          // alert("working2")
        }else if(this.brandListArrayId.length!=0||this.priceArray.length!=0){
          this.isFilterPageActive=true
          this.paginationIsActive=false 
          // alert("working3")
        }
      }) 
    } 
    if(name=='price'&& start!=''){
      if(e.target.checked==true){
        this.is_price=true
        pricefull={
          price_start:start,
          price_end:end
         } 
         this.priceArray.push(pricefull)
         this.priceIndex=i
         if(this.brandListArrayId.length==0){
          this.filter_applied=false
        }
        }else{
        let a:any=this.priceArray.findIndex((d:any)=>d.price_start==start)
        this.priceArray.splice(a,1)
        if(this.brandListArrayId.length==0){
          this.filter_applied=false
        }
        if(start==""){
          pricefull={}
          this.is_price=false
        }
      }
      this.filterRes={
          attribute_filter_applied: null,    
          attribute_code_list: null,    
          brand_filter_applied:this.is_brand,    
          brand_id_list:this.brandListArrayId,    
          filter_applied:this.filter_applied,    
          offer_filter_applied: false,    
          offer_line_id_list: [],    
          page_type: this.page_type,    
          type_code: this.type_code,    
          price_range:this.priceArray,  
          rating_filter_applied: false,    
          rating_list: [],    
          alphabetic_sorting:this.alphabeticeIsActive,    
          price_sorting:this.priceSortIsActive,    
          price_sorting_type:this.priceSortName ,
          segment_code:this.specialGroup

      } 
      this.categoryService.getFilterProduct(this.filterRes)
      this.messageService.getFilter().subscribe((data:any)=>{
        this.searchResultList=data?.results
        this.paginationDetails=data
        if(this.paginationDetails?.next==null){
          this.isFilterPageActive=true
          this.paginationIsActive=false 
          // alert("working1")
        } 
         else if(this.brandListArrayId.length==0&&this.priceArray.length==0){
          this.isFilterPageActive=true
          this.paginationIsActive=false 
          // alert("working2")
        }else if(this.brandListArrayId.length!=0||this.priceArray.length!=0){
          this.isFilterPageActive=true
          this.paginationIsActive=false 
          // alert("working3")
        }
      })
    }
  }


  sortClick(){
    this.sortActive=true
  }


  sort(name:any){
      if(name.target.value=='default'){
        let res:any={
          type_code:this.type_code,
          page_type:this.page_type,
          segment_code:this.specialGroup
        }
        this.categoryService.getCategoryProduct(res)
        this.sortActive=false
        this.messageService.get().subscribe((d:any)=>{
            this.searchResultList=d?.results
        }) 
      }
      if(name.target.value=='low_to_high'||name.target.value=='high_to_low'){
        this.priceSortName=name.target.value
        this.priceSortIsActive=true
        this.alphabeticeIsActive=false
        this.filterRes={
            attribute_filter_applied: null,    
            attribute_code_list: null,    
            brand_filter_applied:this.is_brand,    
            brand_id_list:this.brandListArrayId,    
            filter_applied:this.filter_applied,    
            offer_filter_applied: false,    
            offer_line_id_list: [],    
            page_type: this.page_type,    
            type_code: this.type_code,    
            price_range:this.priceArray,  
            rating_filter_applied: false,   
            rating_list: [],    
            alphabetic_sorting:this.alphabeticeIsActive,    
            price_sorting:this.priceSortIsActive,    
            price_sorting_type:this.priceSortName,
            segment_code:this.specialGroup
        } 
        this.sortActive=false
        this.categoryService.getFilterProduct(this.filterRes)
        this.messageService.getFilter().subscribe((data:any)=>{
          this.searchResultList=data.results
        }) 
      } 
      if(name.target.value=='alphabetic'){
        this.alphabeticeIsActive=true
        this.priceSortName=null
        this.priceSortIsActive=false
        this.filterRes={
            attribute_filter_applied: null,    
            attribute_code_list: null,    
            brand_filter_applied:this.is_brand,    
            brand_id_list:this.brandListArrayId,    
            filter_applied:this.filter_applied,    
            offer_filter_applied: false,    
            offer_line_id_list: [],    
            page_type: this.page_type,    
            type_code: this.type_code,    
            price_range:this.priceArray,  
            rating_filter_applied: false,    
            rating_list: [],    
            alphabetic_sorting:this.alphabeticeIsActive,    
            price_sorting:this.priceSortIsActive,    
            price_sorting_type:this.priceSortName,
            segment_code:this.specialGroup

        }
        this.sortActive=false 
        this.categoryService.getFilterProduct(this.filterRes)
        this.messageService.getFilter().subscribe((data:any)=>{
          this.searchResultList=data.results
        }) 
      }
  }

  nextData(){
    let res:any={
      type_code:this.type_code,
      page_type:this.page_type,
      segment_code:this.specialGroup
    } 
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    if(this.paginationDetails.next!=null){
      this.http.post(this.paginationDetails.next,res,{headers}).toPromise().then((data:any)=>{
        if(data?.status == 'success'){ 
          this.messageService.sendFilter(data.data)
          this.searchResultList=data.data?.results
        }else{
          // this.toaster.warning(data.message)
          // console.log(data.message,"failed");
        }
      })
    }

    
  }

  priviousData(){
    let res:any={
      type_code:this.type_code,
      page_type:this.page_type,
      segment_code:this.specialGroup

    } 
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    if(this.paginationDetails.previous!=null){
      this.http.post(this.paginationDetails.previous,res,{headers}).toPromise().then((data:any)=>{
        if(data?.status == 'success'){ 
          this.messageService.sendFilter(data.data)
          this.searchResultList=data.data?.results
        }else{
          // this.toaster.warning(data.message)
          // console.log(data.message,"failed");
        } 
      })
    }
      
  }

  nextDataFilter(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    if(this.paginationDetails.next!=null){
      this.http.post(this.paginationDetails.next,this.filterRes,{headers}).toPromise().then((data:any)=>{
        if(data?.status == 'success'){ 
          this.messageService.sendFilter(data.data)
          this.searchResultList=data.data?.results
        }else{
          // this.toaster.warning(data.message)
          // console.log(data.message,"failed");
        }
      })
    }
  }

  priviousDataFilter(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    if(this.paginationDetails.previous!=null){
      this.http.post(this.paginationDetails.previous,this.filterRes,{headers}).toPromise().then((data:any)=>{
        if(data?.status == 'success'){ 
          this.messageService.sendFilter(data.data)
          this.searchResultList=data.data?.results
        }else{  
          // this.toaster.warning(data.message)
          // console.log(data.message,"failed"); 
        } 
      })
    }
      
  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 800); 
  }


}
