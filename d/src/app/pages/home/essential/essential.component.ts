import { Component, OnInit, Input,HostListener } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MessengerService } from 'src/app/services/messenger.service';
// import { Banner, BannerCategory } from 'src/app/models/banner';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-essential',
  templateUrl: './essential.component.html',
  styleUrls: ['./essential.component.scss']
})
export class EssentialComponent implements OnInit {

  count = 9
   
  @Input() specialGroups = "groceries"
  productList:any=[]
  popular_category:any = []
  mainSlot_3:any = []
  mainSlot_4:any = []
  mainSlot_5:any = []
  center_slot:any = []
  mainSlot_6:any = []
  mainSlot_7:any = []
  mainSlot_8:any = []
  mainSlot_9_title:any = ""
  // mainSlot_9:Banner[] = []
  mainSlot_10:any = []
  bannerList:any = []
  deals:any=[]
  type_1="1"
  type_2="2"
  type_3="3"
  type_4="4"
  type_5="5"
  divisionLink="/division/"
  groupLink="/productGroup/"
  languageShow:any
  sidraTesting:any
  bulkTempInactive=false
  homeNext:any
  homeArray:any=[]
  homeSecondArray:any=[]
  testingArray:any=[]
  viewAllData:any=[]
  screenWidth: any;
  device:string=""
  isLoading=false
  api_design_layout=environment.api_design_layout
  constructor(private router:Router,
              private _productService: ProductService, 
              private _messageService:MessengerService,
              private auth:AuthService) {
                // this.onScroll()
                this._messageService.getSegments().subscribe((data:any)=>{  
                  this.specialGroups=data
                  this.homeArray=[]
                  // this.onScroll()
                })
                this.screenWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.screenWidth = window.innerWidth;
    }
  ngOnInit(): void {
    // this.bannerList = this._productService.getHomeBanner()
    
    // this.popular_category = this._productService.getPopularCategory()
    // this.callApi(this.specialGroups)   
    // this.personal_store = this._productService.getPersonalStore()
    let language:any = localStorage.getItem('languageName')
    this.languageShow = JSON.parse(language) 
    this.loadData()
     this.onScroll()
     this._messageService.getSegments().subscribe((data:any)=>{  
        this.specialGroups=data
        this.homeArray=[]
        this.onScroll()
        this.loadData()
    })
  
console.log("width",this.screenWidth)
  console.log("device",this.device)
  }

  // getApi(){
  //   this.auth.getHomeApi(this.homeNext).subscribe((d:any)=>{
  //     this.sidraTesting=d.data
  //     this.homeNext=this.sidraTesting.next
  //     console.log(this.homeNext,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  //   })
  // } 

  onScroll() {
    if(this.screenWidth<= 440){
      this.device="mobile"
          }else{
            this.device="web"
          }
    this.homeNext = this.api_design_layout+"/design/page-content-all/"+this.specialGroups+"/sidracart/"+this.device
    let page = 1 
    let i = 1; 
    let url = this.homeNext + "?page=" + i 
    let result_list:any = []
    this.auth.getHomeApi(url).subscribe((d:any)=>{
      this.sidraTesting = d.data
      // console.log(d.data.next)
      // result_list.push(d.data.results)
      // for(let j of d.data.results){
      //     this.homeArray.push(j)
      // } 
      let k:any
      k=d?.data?.count % d?.item_count
      if(k==0){
        page=d?.data?.count/d?.item_count
      }else{
        page=d?.data?.count/d?.item_count
        page += 1
      }
      while(page >i){
        // console.log("Manju korag "+i)
        // console.log(i,"+++++++++++++++++++++");
        let url2 = this.homeNext + "?page=" + i
        // console.log(url2,"&889________+++++++++++++++_______________");
        this.auth.getHomeApi(url2).subscribe((d2:any)=>{
          this.sidraTesting = d2.data 
          let results_data:any = d2.data?.results
          for(let j of results_data){
            this.homeArray.push(j) 
          }  
          result_list.push(results_data)
        }) 
        i ++ 
        // console.log(i);
      }
    })
    console.log(this.homeArray,"*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&")

  }
  // arraySaving(array:any){
  //    this.homeArray=array
  //    console.log(this.testingArray,"*******************^^^^^^^^^^^^^^^^^^^^^");
  // }


  callApi(specialGroup:any){
    
   
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

  viewAll(data:any){
    const arrayAsString = JSON.stringify(data);
    localStorage.setItem('viewAll',arrayAsString )
    this.router.navigate(['/search/'+null+'_&_'+'viewall'])
  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 300); 
  }


}
