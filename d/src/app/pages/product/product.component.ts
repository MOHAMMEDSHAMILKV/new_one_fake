import { Component, AfterViewInit, OnInit,Renderer2, Input, Output,  EventEmitter, HostListener,NgZone, ViewChild, ElementRef} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductdetailsService } from 'src/app/services/productdetails.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { RatingreviewService } from 'src/app/services/ratingreview.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, AfterViewInit {
  productDetails:any
  top:any='21'
  right:any='31'
  lensewidth:any='120'
  lensheight:any='120'
  resultWidth='35'
  resultheight='76'
  imgWidth='300'
  imgheight='300'
  mainImage:any
  mainImageThumb:any
  mainImage_1:any
  is_aboutProductActive=true
  is_ratingActive=false
  active1=true
  active2=false 
  groupListArray:any=[]
  is_wish_active:any
  is_wishlisted=false
  similarPro:any=[]
  relatedPro:any=[]
  is_similar_active=false
  userDetail:any
  sameProductDetail:any=[]
  allCartProduct:any=[]
  inCart=false
  cartDataMain:any=[]
  ourspecialities:any=[
    {"name":"","des":""}
  ]
  currentRating:any
  val1:any=5
  isEdited=false
  images="../../../../assets/products/Rectangle 20530.svg"
  imageShow:any
  imageshow1:any=""
  imageshow2:any=""
  imageshow3:any=""
  imageshow4:any=""
  imageshow5:any=""
  imageArray:any=[]
  highlights:any
  description:any
  imageIdArray:any
  userData:any
  wishlistArray:any=[]
  wishListId:any
  wishListActived=false
  isGroupActive=false
  isDefaultActive=false
  selectImg:any=0
  min:any
  max:any
  productQty:any
  isLoading=false
  constructor(  
    private toaster: ToastrService,
    private router:Router,
    private messenger:MessengerService,
    private auth:AuthService, 
    private cart:CartService,
    private route: ActivatedRoute,
    private wish:WishlistService,
    private http:HttpClient) { }
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    @HostListener('window:scroll', ['$event'])

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    // window.scroll(0,0)

  }
  
    addressArray:any=[]
 
  ngOnInit(): void {
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
    // let min:any
    // let max:any
    if ((this.productDetails?.min_order_limit != null && this.productDetails?.min_order_limit != 0) || (this.productDetails?.max_order_limit != null && this.productDetails?.max_order_limit != 0)) {
      this.min  = (this.productDetails?.min_order_limit != null && this.productDetails?.min_order_limit != 0) ? this.productDetails?.min_order_limit : 1 
      this.max  = (this.productDetails?.max_order_limit != null && this.productDetails?.max_order_limit  != 0 && this.productDetails?.max_order_limit  > this.productDetails?.stock_count) ? this.productDetails?.stock_count : this.productDetails?.max_order_limit 
    }else{
      this.max   = (this.productDetails?.max_order_limit  == null || this.productDetails?.max_order_limit  == 0 ) ? (this.productDetails?.stock_count > 0) ? this.productDetails?.stock_count : 10 : 10
      this.min = 1
    } 
    this.isLoading=true
   this.route.params.subscribe((data:any)=>{
      this.cart.getSingleProduct(data.id).subscribe((data:any)=>{
        this.productDetails=data.data
        console.log("productDetails",this.productDetails);
        localStorage.setItem('productDetails.id', JSON.stringify(this.productDetails.id));
        this.isLoading=false
        this.wish.getIswishlisted(this.productDetails.id).subscribe((d:any)=>{
          if(d.data.results.length!=0){
            this.is_wishlisted=true
          }
        })
        this.mainImage_1=this.productDetails?.images
        console.log( "mainImage_1",this.mainImage_1);
        this.mainImage=this.productDetails?.images[0]
        this.mainImageThumb=this.productDetails?.images[0]
        let user:any = localStorage.getItem('marketplaceUser')
        this.userDetail = JSON.parse(user) 
        if(this.userDetail!=null){
         this.cart.getCartProduct().subscribe((data:any)=>{
           this.allCartProduct=data.data?.added_list
           if(this.allCartProduct.length!=0){
                this.inCart=this.allCartProduct.some((item:any)=>item==this.productDetails.id)
           }
         }) 
        } 
        else{
          let cart:any =  localStorage.getItem('cartData')
          this.cartDataMain = JSON.parse(cart)
          if(this.cartDataMain!=null){
            this.inCart=this.cartDataMain.some((item:any)=>item.variant_id==this.productDetails.id)
          }
        }
      })
      this.cart.getSimilarPro(data.id).subscribe((d:any)=>{
        this.similarPro=d.data?.results
        if(this.similarPro.length!=0){
          this.is_similar_active=true
        }
      })
      this.cart.getRelatedPro(data.id).subscribe((d:any)=>{
        this.relatedPro=d.data?.results
      }) 
      this.wish.getWishListGroup().subscribe((d:any)=>{
        this.groupListArray=d.data.results
        if(this.groupListArray.length!=0){
          this.isGroupActive=true
        }else{ 
          this.isGroupActive=false
        }
        if(this.groupListArray.length==1){
          let name=null
          name=this.groupListArray.filter((d:any)=>d.group_name=="default")
          if(name!=null){
            this.isDefaultActive=true
          }else{
            this.isDefaultActive=false
          }
        }
        
      })
      this.wish.userWishListId().subscribe((d:any)=>{
        this.wishlistArray=d.data?.added_list
        this.wishListId=this.wishlistArray.some((item:any)=>item==this.productDetails.id)
        if(this.wishListId==true){
          this.is_wishlisted=true
        }else{
          this.is_wishlisted=false
        }
        
      })
      this.cart.getSameProduct(data.id).subscribe((s:any)=>{
        this.sameProductDetail=s.data?.results
      }) 

   }) 
   this.auth.getAddressList().subscribe((data:any)=>{
    this.addressArray=data.data?.results
   })
  console.log( "productdetails",this.productDetails);
  
  } 


  addToCart(prod:any){
    if(this.userDetail!=null){
      let product = {
        id: prod.id,
        inventory_id: prod.inventory_id,
        image1: prod.image1,
        name:prod.name
      }
      this.cart.addToCart(product,1) 
    }else{
      this.cart.addToLocalCart(prod,1)
    }
  }

  addToCartQuantity(prod:any){
    if(this.userDetail!=null){
      let product = {
        id: prod.id,
        inventory_id: prod.inventory_id,
        image1: prod.image1,
        name:prod.name
      }
      this.cart.addToCart(product,this.productQty) 
    }else{
      this.cart.addToLocalCart(prod,this.productQty)
    }
  }
  
  buyNow(){
     if(this.userDetail!=null){
      let finalAddress:any=this.addressArray.filter((d:any)=>d.is_default==true)
      let orderlines:any={
        variant_id:this.productDetails.id,
        total_quantity: 1,          
        amount: this.productDetails?.selling_price,          
        inventory_id: this.productDetails?.inventory_id,          
        is_single_delivery: true,          
        delivery_address_id: finalAddress[0].id,          
        billing_address_id: finalAddress[0].id,          
        channel_code: this.productDetails?.channel_code,
      }
      this.cart.OrderCreateDirect(orderlines)
     }
     else{
       this.router.navigate(['/auth'])
     }
  }

  imageChange(name:any,item:any){
     this.selectImg=name
     this.mainImageThumb=item
     this.mainImage=item
   
  }

  activeBtn(name:any){
    if(name=="active1"){
      this.active1=true
      this.active2=false
    }
    if(name=="active2"){
      this.active1=false
      this.active2=true
    }
  }
  
  about(){
    this.is_aboutProductActive=true
    this.is_ratingActive=false
  }

  rating(){
    this.is_aboutProductActive=false
    this.is_ratingActive=true
  }

 
  movetoAnother(item:any,id:any,index:any){
    // this.ismove_active=true
    let wish1={
      variant_id:item.id,
      group_id:id,
      varient_code:item.code,
      inventory_code:item.inventory_id
    }
    this.wish.createWishlist(wish1) 
    this.is_wish_active=index  
    this.is_wishlisted=true
    this.wishListActived=false
  } 

  wishListdropDown(item:any){
    if(this.is_wishlisted==true){
      this.wishListActived=false
      this.wish.unWishlisted(this.productDetails.id)
      this.messenger.getWish().subscribe((d:any)=>{
        if(d=='success'){
          this.is_wishlisted=false
          this.is_wish_active=null
        } 
      }) 
    }
    else if(this.is_wishlisted==false&&this.isGroupActive==false){ 
      this.wishListActived=true
      this.is_wish_active=null
      this.is_wishlisted=true
      alert("ko")
      let name=null
      name=this.groupListArray.filter((d:any)=>d.group_name=="default")
      this.wishListActived=false
      this.is_wish_active=null
      let wish1:any={
        variant_id:item.id,
        group_id:null,
        varient_code:item.code,
        inventory_code:item.inventory_id
      }
      this.wish.createWishlist(wish1) 
      // this.is_wish_active=index  
    } 
    else if(this.is_wishlisted==false&&this.isGroupActive==true&&this.isDefaultActive==false){ 
      this.wishListActived=true
      this.is_wish_active=null
    } 
    else if(this.is_wishlisted==false&&this.isGroupActive==true&&this.isDefaultActive==true){ 
      let name=null
      name=this.groupListArray.filter((d:any)=>d.group_name=="default")
      this.wishListActived=false
      this.is_wish_active=null
      let wish1:any={
        variant_id:item.id,
        group_id:name[0]?.id,
        varient_code:item.code,
        inventory_code:item.inventory_id
      }
      this.wish.createWishlist(wish1) 
      // this.is_wish_active=index  
      this.is_wishlisted=true
      this.wishListActived=false
    } 
  } 

  
  navigateProductPage(id:any){
    this.router.navigate(['/product/' + id])
  } 
  
  navigateSearchPage(id:any){
    this.router.navigate(['/search/' + id+'_&_'+'id'])
  }

  imageUpload(event:any,type:any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const profilepic = <File>event.target.files[0]
      const fd = new FormData();
      const name=event.target.value
      fd.append('upload',profilepic,profilepic.name)
      const imageData={
        upload:fd,
      }
      this.http.post('https://api-uat-user.sidrabazar.com/file-upload',fd).toPromise().then((d:any)=>{
        this.imageIdArray.push(d?.data?.id)
        let image={
          image:d?.data?.upload
        }
        this.imageArray.push(image)
      })
    }
  }
  splice(i:any){
    this.imageArray.splice(i,1)
  }

  qty(i:number){
    return new Array(i+1);
  }

}


