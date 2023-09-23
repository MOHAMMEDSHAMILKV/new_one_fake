import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProductRealChild } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-card-one',
  templateUrl: './product-card-one.component.html',
  styleUrls: ['./product-card-one.component.scss']
})
export class ProductCardOneComponent  {
  @Input() wishlist = false
  @Input () control= true
  @Input() products!: ProductRealChild;
  @Input() wishListed = false
  @Output() cartEvent = new EventEmitter()
  @Output () wishEvent = new EventEmitter()
  @Output () isWishListEvent = new EventEmitter()
  @Input() block_design:any
  is_addtocart=true
  is_count=false
  count:any=1
  groupListArray:any=[]
  is_wish_active:any
  is_wishlisted=false
  wishlistArray:any=[]
  wishListId:any
  wishListActived=false
  allCartProduct:any=[]
  inCart=false
  inCartIsActive=false
  withAndWithoutLoginBtn=false
  isGroupActive=false
  isDefaultActive=false
  groupName:any
  withLoginwishList=false
  dataKey="cartData"
  withOutLoginArray:any=[]
  currentQty = 1
  maxQty:any
  minMumQty:any
  adderDisable=false
  reduceDisable=false
  constructor( 
    private messageService:MessengerService,
    private cart:CartService,
    private wish:WishlistService,
    private router:Router
  ) { }

  ngOnInit(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
     let min:any
    let max:any
    if ((this.products?.min_order_limit != null && this.products?.min_order_limit != 0) || (this.products?.max_order_limit != null && this.products?.max_order_limit != 0)) {
      min  = (this.products?.min_order_limit != null && this.products?.min_order_limit != 0) ? this.products?.min_order_limit : 1 
      max  = (this.products?.max_order_limit != null && this.products?.max_order_limit  != 0 && this.products?.max_order_limit  > this.products?.stock_count) ? this.products?.stock_count : this.products?.max_order_limit 
    }else{
      max   = (this.products?.max_order_limit  == null || this.products?.max_order_limit  == 0 ) ? (this.products?.stock_count > 0) ? this.products?.stock_count : 10 : 10
      min = 1
    } 
    // max = this.products?.max_order_limit > 10 ? 10 : this.products?.max_order_limit 
    this.currentQty=min 
    this.maxQty=max
    this.minMumQty=min 
    if(userDetails!=null){
      this.withLoginwishList=true
      this.withAndWithoutLoginBtn=true
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
        this.wishListId=this.wishlistArray.some((item:any)=>item==this.products.id)
        if(this.wishListId==true){
          this.is_wishlisted=true
        }else{
          this.is_wishlisted=false
        }
      })
      this.cart.getCartProduct().subscribe((data:any)=>{
        this.allCartProduct=data.data?.added_list
        this.inCart=this.allCartProduct.some((item:any)=>item==this.products.id)
        if(this.inCart==true){
          this.inCartIsActive=true
          this.is_addtocart=false
        }
        else{
          this.inCartIsActive=false
          this.is_addtocart=true
        } 
      })
    }
    else{
      this.withLoginwishList=false
      this.withAndWithoutLoginBtn=false
      let history:any =  localStorage.getItem(this.dataKey)
      this.withOutLoginArray = JSON.parse(history)
      if(this.withOutLoginArray!=null){
        this.inCart=this.withOutLoginArray.some((item:any)=>item.variant_id==this.products.id)
      }
      if(this.inCart==true){
        this.inCartIsActive=true
        this.is_addtocart=false
        this.withAndWithoutLoginBtn=true
      } 
      else{
        this.inCartIsActive=false
        this.is_addtocart=true 
        this.withAndWithoutLoginBtn=false
      }
    }
    this.wishListActived=true 
  }

  changeWishlist(product:any) {
    this.wishEvent.emit(product)
  }

  addCart(prod: any) {
    this.cartEvent.emit(prod)
  } 

  buyNow() {
    
  }

  navigateProductPage(id:any){
    this.router.navigate(['/product/' + id])
  } 

  addToCart(prod:any){
    this.is_count=true
    this.is_addtocart=false
    this.cart.addToCart(prod,this.currentQty) 
  }

  addToCartLocal(prod:any){
    this.is_count=true
    this.is_addtocart=false
    this.cart.addToLocalCart(prod,this.currentQty) 
    console.log(prod);
  }

  adder(prod:any){
    if(this.maxQty>10){
      this.maxQty=10
    }
    if(this.currentQty  < this.maxQty){
      this.currentQty=this.currentQty+1
      this.cart.addToCart(prod, this.currentQty) 
    }else{
      this.adderDisable=true
    }
  }

  reduce(prod:any){
    if(this.currentQty > this.minMumQty){
      this.currentQty=this.currentQty-1
      this.cart.addToCart(prod,this.currentQty) 
    }else{
      this.reduceDisable=true
      this.is_addtocart=true
      this.cart.removeSidraCart(prod.id)
    }
 
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
      // this.wishListActived=false
      this.wish.unWishlisted(this.products.id)
      this.messageService.getWish().subscribe((d:any)=>{
        if(d=='success'){
          this.is_wishlisted=false 
          this.is_wish_active=null
        } 
      }) 
      console.log("is_wishlisted@@@@@@@@",this.is_wishlisted);
      console.log("wishListActived@@@@@@@@",this.wishListActived);

      console.log("1");
    }
    else if(this.is_wishlisted==false&&this.isGroupActive==false){ 
      this.wishListActived=true
      this.is_wish_active=null
      this.is_wishlisted=true
   
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
      console.log("is_wishlisted@@@@@@@@",this.is_wishlisted);
      console.log("2");
    } 
    else if(this.is_wishlisted==false&&this.isGroupActive==true){ 
      console.log("wishListActived",this.wishListActived);
      console.log("isGroupActive",this.isGroupActive);
      this.wishListActived=true
      this.is_wish_active=null
      console.log("3");
      
    } 
  } 

  popup(){
    // const windowHeight = window.innerHeight;
    // const pageHeight = document.body.scrollHeight;
    // const midpoint = pageHeight / 2 - windowHeight / 2;
    // window.scrollTo(0, midpoint);
  }

  scrollToTop(): void {
    // window.scrollTo(0, 0);
  }
} 
