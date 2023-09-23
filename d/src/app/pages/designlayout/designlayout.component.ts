import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
@Component({
  selector: 'app-designlayout',
  templateUrl: './designlayout.component.html',
  styleUrls: ['./designlayout.component.scss']
})
export class DesignlayoutComponent implements OnInit {
  parentLink = "/productGroup/"
  searchCategory = ""
  is_division = false
  divisionName = ""
  next:any
  allProducts:any=[]
  searchResult:any = []
  currentSubcategory = 0
  sideFilter:any = []
  specialGroups = ""
  productRoute= {name:String};
  popular_category: any = []
  mainslot_2:any = []
  mainslot_3:any = []
  mainslot_4:any = []
  mainslot_5:any[] = []
  mainslot_6:any = []
  mainslot_7:any = []
  mainslot_8:any[] = []
  mainslot_9:any = []
  mainslot_10:any = []
  mainslot_11:any = []
  mainslot_12:any = []
  mainslot_13:any = []
  count = 7
  today={
    sectionTitle:"Todays Deals",
    products:<any>[]
  }
  opened = false
  constructor(private http:HttpClient,
    private msg:MessengerService,
    private router:Router,
    private _productService: ProductService,
    private categoryService:CategoryService,
    private route: ActivatedRoute) { 
      this.msg.getSearchData().subscribe((data:any)=>{
        this.searchResult = data
      })
    }

    ngAfterViewInit(){
      // window.scroll(0,0)
    }
    ngOnInit(): void {
      this.productRoute ={
        name: this.route.snapshot.params['name'],
      }
      let demo:any = this.productRoute?.name
      let split = demo.split('_$_') 
      let name = split[0] 
      this.divisionName = name
      let type = split[2]
      let code = split[1]
      let category_division =  split[4]
      this.categoryService.getCategoryProducts(code).subscribe((data:any)=>{
        this.allProducts = data.data.results
        this.next=data.data.next
      })
      this.specialGroups = type
      let categoryId  = split[2]
      if(category_division == 'category'){
        this.is_division = false
        // this.categoryService.getCategoryFilter(code).subscribe((data:any)=>{
        //   this.sideFilter = data.data
        // })
      }else{
        this.is_division = true
        // this.categoryService.getDivisionFilter(code).subscribe((data:any)=>{
        //   this.sideFilter = data.data.results
        // })
      }
  
      // this.categoryService.getCategorySlotOne(name,type).subscribe((data:any)=>{
      //   this.popular_category = data.data
      //   console.log(this.popular_category);
        
      //   this.popular_category.products = this.popular_category?.products?.sort((a:any, b:any) => parseFloat(a.Priorty) - parseFloat(b.Priorty))
      // })
      // this.categoryService.getCategorySlotTwo(name,type).subscribe((data:any)=>{
      //   this.mainslot_2 = data.data.banner
      //   if(data.data.length == 0)this.mainslot_2 = data.data
      // })
      // this.categoryService.getCategorySlotThree(name,type).subscribe((data:any)=>{
      //    this.mainslot_3 = data.data
      //    console.log(data.data);
      // })
      // this.categoryService.getCategorySlotFour(name,type).subscribe((data:any)=>{
      //    this.mainslot_4 = data.data
      // })
      // this.categoryService.getCategorySlotFive(name,type).subscribe((data:any)=>{
      //   this.mainslot_5 = data.data.banner
      //   if(data.data.length==0)this.mainslot_5 = data.data
      // })
      // this.categoryService.getCategorySlotSix(name,type).subscribe((data:any)=>{
      //   this.mainslot_6 = data.data
      // })
      // this.categoryService.getCategorySlotSeven(name,type).subscribe((data:any)=>{
      //   this.mainslot_7 = data.data
      // })
      // this.categoryService.getCategorySlotEight(name,type).subscribe((data:any)=>{
      //   this.mainslot_8 = data.data.banner
      //   if(data.data.length==0)this.mainslot_8 = data.data
      // })
      // this.categoryService.getCategorySlotNine(name,type).subscribe((data:any)=>{
      //   this.mainslot_9 = data.data
      // })
      // this.categoryService.getCategorySlotTen(name,type).subscribe((data:any)=>{
      //   this.mainslot_10 = data.data
      // })
      // this.categoryService.getCategorySlotEleven(name,type).subscribe((data:any)=>{
      //   this.mainslot_11 = data.data.banner
      //   if(data.data.length == 0)this.mainslot_11 = data.data
      // })
      // this.categoryService.getCategorySlotTwelve(name,type).subscribe((data:any)=>{
      //   this.mainslot_12 = data.data
      // })
      // this.categoryService.getCategorySlotThirteen(name,type).subscribe((data:any)=>{
      //   this.mainslot_13 = data.data
      // })
      let products = this._productService.getProducts();
      let today = products.filter((p:any) => p.percentOff == 0);
      this.today.products= today;
    }
  
    selectCategory(index:any){
      this.currentSubcategory = index
    }
    onCategorySearch(search:any){
      this.productRoute ={
        name: this.route.snapshot.params['name'],
      }
      let demo:any = this.productRoute?.name
      let split = demo.split('_$_')  
      let code = split[1]
      let type = split[2]
      this.productRoute ={
        name: this.route.snapshot.params['name'],
      }
      let name = split[0] 
      this.divisionName = name
      let category_division =  split[4]
      if(search==''){
        this.searchResult = {}
      }else{
        let searchData = {
          code: code,
          name: search,
          page_type:type
        }
        this.categoryService.getCategoryDivisionSearch(searchData,this.specialGroups)
      }
    }
    routeSubCategory(item:any,type:any){
      
      if(type === "category"){
        this.router.navigate(['division/'+ item.name+'_$_'+ item.code+'_$_'+this.specialGroups+'_$_'+item.id+'_$_'+'category'])
      }else{
        if(type == 'subCategory'){
          this.router.navigate(['productGroup/'+item.code+'_$_'+ item.name +'_$_'+this.specialGroups+'_$_'+item.id+'_$_'+'category'])
        }else{
          this.router.navigate(['productGroup/'+item.code+'_$_'+ item.name +'_$_'+this.specialGroups+'_$_'+item.id+'_$_'+'group'])
        }
      }
      setTimeout(() => {
        window.location.reload()
      }, 500);
    } 
  
    routeSubCategoryDivisionSearch(item:any,type:any){
      this.productRoute ={
        name: this.route.snapshot.params['name'],
      }
      let demo:any = this.productRoute?.name
      let split = demo.split('_$_')  
      let code = split[1]
      let filterType = split[2]
      if(type === "category"){
        this.router.navigate(['division/'+ item.name+'_$_'+ item.code+'_$_'+filterType+'_$_'+item.id+'_$_'+'category'])
      }else{
        if(type == 'subCategory'){
          this.router.navigate(['productGroup/'+item.code+'_$_'+ item.name +'_$_'+filterType+'_$_'+item.id+'_$_'+'category'])
        }else{
          this.router.navigate(['productGroup/'+item.code+'_$_'+ item.name +'_$_'+filterType+'_$_'+item.id+'_$_'+'group'])
        }
      }
      setTimeout(() => {
        window.location.reload()
      }, 500);
    } 
  
    routeTo(type:string,name:string, id:number, section:any, code:any){
      if(type === "Category"){
        this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
      }else{
        if(type == 'Category'){
          this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
        }else{
          this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
        }
      }
      setTimeout(() => {
        window.location.reload()
      }, 500);
    }
  
  
    allEmpty(){
      if(!this.popular_category?.products&&this.mainslot_2?.length == 0&&!this.mainslot_3?.products&&!this.mainslot_4?.products&&this.mainslot_5?.length == 0&&!this.mainslot_6?.products&&!this.mainslot_7?.products&&this.mainslot_8?.length == 0&&!this.mainslot_9?.products&&!this.mainslot_10?.products&&this.mainslot_11?.length == 0&&!this.mainslot_12?.products&&!this.mainslot_13?.products)return true
      return false
    }
  
    loadMore(next:any){
      this.http.get<any>(next).subscribe((data:any)=>{
        let products = data?.data?.results
        products.filter((data:any)=>{
          this.allProducts.push(data)
        })
        this.next = data?.data.next
        if(data?.data.next === null){
          this.next = null
        }
      })
    }

}
