import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  productRoute= {name:String};
  next:any
  totalCount =0
  pageCount:any = []
  linkToPost = ""
  activePage = 1
  searchResultList:any=[]
  searchBackResultList:any=[]
  searchValue = ""
  filter = "all"
  isBrand=true
  searchData:any
  brandArray:any=[
    {"name":"Apple(Iphone)"},
    {"name":"Samsung"},
    {"name":"Huawei"},
    {"name":"Huawei"},
    {"name":"Adidas"},
    {"name":"Puma"},
    {"name":"Converse"},
    {"name":"Reebok"}
  ]
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
  isPrice=true
  isColor=true
  searchIsActive=false
  headingData:any
  cateName:any=""
  searchName:any
  paginationDetails:any
  isLoading=false
  productid:any
  constructor(private http:HttpClient,
              private router:Router,
              private route: ActivatedRoute,
              private categoryService:CategoryService,
              private messageService: MessengerService,
              private _productService: ProductService,
              private cart:CartService) { 
    this.messageService.getsearchValue().subscribe((data:any)=>{
      // this.ngOnInit()
      this.pageCount = []
      this.totalCount = this.next.count/26
      this.totalCount = Math.ceil(this.totalCount)
      for(let i=0; i<this.totalCount; i++){
        this.pageCount.push(i+1)
      }
      this.productRoute ={
        name: this.route.snapshot.params['name'],
      }
      let demo:any = this.productRoute?.name
      // setTimeout(() => {
      //   this.ngOnInit()
      // }, 2000);
    })
  }

  ngOnInit(): void { 
    this.pageCount = []
    this.searchValue = ""
    this.isLoading=true
    this.route.params.subscribe((data:any)=>{
      this.searchValue = ""
      this.productRoute ={
        name: this.route.snapshot.params['name'],
      }
      this.searchData=data.name
      let demo:any = this.productRoute?.name
      let split = demo.split('_&_')
      let categoryCode = split[0]
      let searchData = split[0]
      this.headingData=split[0]
      let demo1=split[1]
      this.cateName=split[2]
      this.searchName= split[0]
      let searchValueSplit = searchData.split('_&_')
      searchValueSplit.filter((data:any)=>{
        let word = data+' '
        this.searchValue = this.searchValue+word 
      })  

      if(demo1=="search"){
        this.searchIsActive=false
        this.categoryService.getSearchProduct(data.name).subscribe((data:any)=>{
          this.searchResultList = data?.data?.results
          this.isLoading=false
          this.searchBackResultList = data?.data?.results
          this.paginationDetails=data.data
          this.next=data?.data?.next
        }) 
      }
      if(demo1=="id"){
        this.searchIsActive=true
        this.cart.getSimilarPro(searchData).subscribe((d:any)=>{
          this.searchResultList = d?.data?.results
          this.isLoading=false

        })
      } 
      if(demo1=="viewall"){
        this.searchIsActive=true
        this.isLoading=false
        let user:any = localStorage.getItem("viewAll")
        let searchDataForHome = JSON.parse(user)
        for(let i of searchDataForHome){
          for(let j of i.value){
            this.searchResultList.push(j)
          }
        } 
      } 
    }) 

    const storedValue = localStorage.getItem('productDetails.id');
    if (storedValue) {
      this.productid = JSON.parse(storedValue);
    }
  }
  

  brandSelect(){
    this.isBrand=!this.isBrand
  }

  Priceselct(){
    this.isPrice=!this.isPrice
  }

  colorSelect(){
    this.isColor=!this.isColor
  }

  Searchfilter(e:any){
    let value:any=e.target.value
    if(this.cateName!=undefined ){
      this.categoryService.getSearchProductFilter(this.searchName,this.cateName,value).subscribe((d:any)=>{
        this.searchResultList=d.data.results
      })
    }
    else{
      this.categoryService.getSearchProductFilter2(this.searchName,value).subscribe((d:any)=>{
        this.searchResultList=d.data?.results
      })
    }
  }

  priviousData(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.isLoading=true
    if(this.paginationDetails?.previous!=null){
      this.http.get<any>(this.paginationDetails?.previous).subscribe((d:any)=>{
        this.searchResultList = d.data?.results
        this.paginationDetails=d.data
        this.isLoading=false
      }) 
    } 
      
  }

  nextData(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.isLoading=true
    if(this.paginationDetails?.next!=null){
      this.http.get<any>(this.paginationDetails?.next).subscribe((d:any)=>{
        this.searchResultList = d.data?.results
        this.paginationDetails=d.data
        this.isLoading=false
      })
    }
  }

  
  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 800); 
  }
  back(){
    this.router.navigate(['/product/'+this.productid])
  }
}
