import { MessengerService } from 'src/app/services/messenger.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api_user = environment.api_user
  api_cart_checkout = environment.api_cart_checkout
  api_inventory= environment.api_inventory
  api_finance=environment.api_finance
  api_promotion=environment.api_promotion
  api_system_arch=environment.api_system_arch
  slot= "/design/list-slotblock/" 
  searchProduct = "/elastic_inventory/product-search?q="
  searchSuggession = "/elastic_inventory/product-sujection?q="
  categoryProducts = "/display/filter-variant/"
  bannerCateProducts="/display/list-variants-by-banner/"
  categoryFilter = "/display/get-side-filter-in-categorypage/"
  divisionFilter = "/display/get-side-filter-in-divisionpage/"
  allCategory = "/display/list-all-categories-and-subcategories"
  brandList = "/display/get-brand-list-by-type/" 
  productUnderBrand = "/display/list-variants-by-brandlist"
  starFilter = "/display/list-variants-by-type-rating" 
  allFilter = "/display/side-filter-in-one"
  categorySearch = "/inventory-product/subcategory-group-search-by-parent?seg_name="
  divisionCategory="/display/list-all-division-categories-and-subcategories"
  verifyTypeCode="/display/verify-type-of-code/"
  brandBasedProductList:any = []
  starBasedProductList:any = [] 
  filteredProducts:any=[]
  searchresultCategory:any = []
  constructor(private http: HttpClient,private toaster: ToastrService,private message:MessengerService) { }
  

  allDataFilter(data:any){
    this.http.post(this.api_inventory+this.allFilter,data).toPromise().then((data:any)=>{
      if(data?.status === 'sucess'){
        this.filteredProducts = data.data
        this.message.sendFailedData(this.filteredProducts)
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    }).catch((d)=>{
      this.toaster.error(d.status);
    })
  }

  getSearchSuggesion(name:any){
    return this.http.get<any>(this.api_inventory+this.searchSuggession+name)
  }

  getCategoryProduct(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_inventory+"/display/get-variants-by-page-type",data,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){ 
        this.filteredProducts = data.data
        this.message.send(this.filteredProducts)
      }else{
        // this.toaster.warning(data.message)
        // console.log(data.message,"failed");
      }
    })
  }

  getFilterProduct(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_inventory+"/display/side-filter-in-one",data,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){ 
        this.filteredProducts = data.data
        this.message.sendFilter(this.filteredProducts)
      }else{
        // this.toaster.warning(data.message)
        // console.log(data.message,"failed");
      }
    })
  }

  getSearchProduct(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/elastic_inventory/product-search-clone?q="+name,{headers})
  }

  getSearchProductFilter(name:any,cateName:any,sort:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/elastic_inventory/product-search-clone?q="+name+"&catName"+cateName+"&sort="+sort,{headers})
  }
  

  getSearchProductFilter2(name:any,sort:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>("https://api-uat-inventory.sidrabazar.com"+"/elastic_inventory/product-search-clone?q="+name+"&sort="+sort,{headers})
  }
  
  
  getFaqSetails(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_system_arch+"/policy/policies-by-group?key=faq")
  }

  faqSearch(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_system_arch+"/policy/policies-by-group?key=faq&search_text="+data)
  }

  getBrand(code:any,name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/display/get-brand-list-by-type/"+code+"?type="+name,{headers})
  }

  getGroup(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/display/get-brand-list-by-type?type="+name,{headers})
  }

  getBrandList(id:any,type:any){
    return this.http.get<any>(this.api_inventory+this.brandList+id+'?type='+type)
  }
  getProductUnderBrand(data:any){
    this.http.post(this.api_inventory+this.productUnderBrand,data).toPromise().then((data:any)=>{
      if(data?.status === 'sucess'){
        this.brandBasedProductList = data
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
      this.toaster.error(d.status);
    })
  }
  getSearchResult(){
    return this.searchresultCategory
  }
  getCategoryDivisionSearch(data:any,type:any){
    this.http.post(this.api_inventory+this.categorySearch+type,data).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.searchresultCategory = data.data
        this.message.sendSearchData(this.searchresultCategory)
        
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
    })
  }
  getProductStarBased(data:any){
    this.http.post(this.api_inventory+this.starFilter,data).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.starBasedProductList = data
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
      this.toaster.error(d.status);
    })
  }
  getCategoryProducts(CODE:any){
    return this.http.get<any>(this.api_inventory+this.categoryProducts+CODE)
  }

  getCategoryProductsByName(name:any){
    return this.http.get<any>(this.api_inventory+this.bannerCateProducts+name)
  } 

  getAllCategory(type:any){
    return this.http.get<any>(this.api_inventory+this.allCategory)
  }
  // getCategoryFilter(id:any){
  //   return this.http.get<any>(this.api_inventory+this.categoryFilter+id)
  // }

  

}
