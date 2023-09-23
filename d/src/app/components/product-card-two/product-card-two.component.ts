import { Component, Input,OnInit, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { ProductRealChild } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-card-two',
  templateUrl: './product-card-two.component.html',
  styleUrls: ['./product-card-two.component.scss']
})
export class ProductCardTwoComponent implements AfterViewInit , OnInit {
  isLogin = false
  cartData:any = []
  buttondissable = false
  currentQty = 0
  max_order_limit=20
  @Output() maxQty = 10
  dissableReduce = false 
  dissableAdder = false 
  @Input() qtyRefresh = false
  @Input() reloadNeed = false
  @Input() wishlist = false
  @Input() control= true
  @Input() products!: ProductRealChild;
  @Input() wishListed = false 
  // @Input() stock_count=0
  @Output() cartEvent = new EventEmitter()
  @Output () wishEvent = new EventEmitter()
  @Output () isWishListEvent = new EventEmitter()
  @Output () max_limit=0 
  @Output () min_limit=0
  BtnAvailable=false 
  qtyArray:any=[]
  isLoading=false
  maxOrderLimit:any
  minOrderLimit:any
  stockCount:any
  minMumQty:any
  productDetail="/product/"
  constructor(
    private messageService:MessengerService,
    private router:Router,
    private _cartService:CartService,
    private _wishlistService:WishlistService,
    private toastr:ToastrService
  ) { 
    this.cartData = this._cartService.getCartValue()
    let CartData = localStorage.getItem('CartData')
    if(CartData != null){
      let cart = JSON.parse(CartData)
      this.cartData = cart.cart_products

    }
  }

  ngOnInit(): void {
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData !=null){
      this.isLogin = true
      if ((this.products.min_order_limit != null && this.products.min_order_limit != 0) || (this.products.max_order_limit != null && this.products.max_order_limit != 0) ) {
        this.products.min_order_limit  = (this.products.min_order_limit != null && this.products.min_order_limit != 0) ? this.products.min_order_limit : 1
        this.products.max_order_limit  = (this.products.max_order_limit != null && this.products.max_order_limit != 0 && this.products.max_order_limit > this.products.stock_count) ? this.products.stock_count : this.products.max_order_limit
      }else{
        this.products.max_order_limit  = (this.products.max_order_limit == null || this.products.max_order_limit == 0 ) ? (this.products.stock_count > 0) ? this.products.stock_count : 10 : 10
        this.products.min_order_limit = 1
      } 
      this.products.max_order_limit = this.products.max_order_limit > 10 ? 10 : this.products.max_order_limit 
      this.max_order_limit=this.products.max_order_limit
      this.minOrderLimit=this.products.min_order_limit
      this.stockCount=this.products.stock_count
    }else{
      if ((this.products.min_order_limit != null && this.products.min_order_limit != 0) || (this.products.max_order_limit != null && this.products.max_order_limit != 0) ) {
        this.products.min_order_limit  = (this.products.min_order_limit != null && this.products.min_order_limit != 0) ? this.products.min_order_limit : 1
        this.products.max_order_limit  = (this.products.max_order_limit != null && this.products.max_order_limit != 0 && this.products.max_order_limit > this.products.stock_count) ? this.products.stock_count : this.products.max_order_limit
      }else{
        this.products.max_order_limit  = (this.products.max_order_limit == null || this.products.max_order_limit == 0 ) ? (this.products.stock_count > 0) ? this.products.stock_count : 10 : 10
        this.products.min_order_limit = 1
      } 
      this.products.max_order_limit = this.products.max_order_limit > 10 ? 10 : this.products.max_order_limit 
      this.max_order_limit=this.products.max_order_limit
      this.minOrderLimit=this.products.min_order_limit
      this.stockCount=this.products.stock_count 
    }
    this.messageService.getBtnAvailable().subscribe((data:any)=>{
      if(data=="failed"){
        this.BtnAvailable=true
      }
      
    })
  }
  
  ngAfterViewInit(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData !=null){
      this.isLogin = true
      this.cartData = this._cartService.getCartValue()
      let wishData:[] = this._wishlistService.getWithoutData()
      if(wishData?.length != 0){
        wishData?.filter((data:any)=>{
          if(data.variant_id == this.products.id){
            this.wishListed = true
          }
        })
      }
      this.cartData.filter((data:any)=>{
        if(data.variant_id == this.products.id){
          this.currentQty = data.quantity
        }
      })
    }
    else{
      this.isLogin = false
      let CartData = localStorage.getItem('CartData')
      if(CartData != null){
        let cart = JSON.parse(CartData)
        this.cartData = cart.cart_products
        // cart_products
      }
      this.cartData.filter((data:any)=>{
        if(data.variant_id == this.products.id){
          this.currentQty = data.quantity
        }
      })
      // this.cartData = this._cartService.getLocalCart()
    }
    this.messageService.getBtnAvailable().subscribe((data:any)=>{
      if(data=="failed"){
        this.BtnAvailable=true
      }
      
    })
  }


  changeWishlist(id:any) {
    this._wishlistService.addToWishList(id)
    this.wishListed = !this.wishListed
    
  }
  
  addCart(prod: any,min:any,max:any,count:any) {
    if ((min != null && min != 0) || (max != null && max != 0) ) {
      min  = (min != null && min != 0) ? min : 1
      max  = (max != null && max != 0 && max > count) ? count : max
    }else{
      max  = (max == null || max == 0 ) ? (count > 0) ? count : 10 : 10
      min = 1
    } 
    max = max > 10 ? 10 : max 
    
    if(this.isLogin==false){
      this.buttondissable = true
      setTimeout( () => { 
        this.buttondissable = false
      }, 2000);
      this.currentQty=min 
      this.maxQty=max
      this.minMumQty=min
      // this.currentQty = this.currentQty + 1
      let product = {
        id: prod.id,
        inventory_id: prod.inventory_id,
        image1: prod.image1,
        name:prod.name,
        price:prod.selling_price,
        max_order_limit:max,
        min_order_limit:min,
        stock_count:count
      } 
      this._cartService.addToLocalCart(product,this.currentQty)
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000);
      // this.toastr.warning('Please Login','',{timeOut:3000});
      return
    }else{
      this.buttondissable = true
      setTimeout( () => { 
        this.buttondissable = false
      }, 2000);
      this.currentQty=min
      this.maxQty=max
      this.minMumQty=min
      // this.currentQty = this.currentQty + 1
      let product = {
        id: prod.id,
        inventory_id: prod.inventory_id,
        image1: prod.image1,
        name:prod.name
      }   
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000);
      this._cartService.addToCartsample(product,this.currentQty,prod) 
    } 
  }

  routeTo(id:any){
    // this.router.navigate(['/product/'+id])
    return `#${this.productDetail}${id}`
  }  

  reduce(prod:any,min:any){
    
    if(min!=null){
      if(!this.isLogin){
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 2000);
        if(this.currentQty > min){
          this.currentQty = this.currentQty-1
          let product = { 
            id: prod.id,
            inventory_id: prod.inventory_id,
            // image1: prod.image1,
            name:prod.name, 
            price:prod.selling_price,
          } 
          this._cartService.addToLocalCart(product,this.currentQty) 
          if(this.qtyRefresh){
            // setTimeout(() => {
            //   window.location.reload()
            // }, 500);  
          }  
        }else{ 
          this.dissableReduce = true
        }
        return
      }else{
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 2000);
        if(this.currentQty > min){
          this.currentQty = this.currentQty - 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name
          }
          this._cartService.addToCart(product,this.currentQty) 
          if(this.qtyRefresh){
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
        }else{
          this.dissableReduce = true
        }
      }
    }else{
      if(!this.isLogin){
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 2000);
        if(this.currentQty > 1){
          this.currentQty = this.currentQty - 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name,
            price:prod.selling_price,
          } 
          this._cartService.addToLocalCart(product,this.currentQty) 
          if(this.qtyRefresh){
            // setTimeout(() => {
            //   window.location.reload()
            // }, 500);
          }
        }else{
          this.dissableReduce = true
        }
        return
      }else{
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 2000);
        if(this.currentQty > 1){
          this.currentQty = this.currentQty - 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name
          }
          this._cartService.addToCart(product,this.currentQty) 
          if(this.qtyRefresh){
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
        }else{
          this.dissableReduce = true
        }
      }
    }
   
  }
  
  adder(prod:any,min:any,max:any){
    if(min!=null){
      if(!this.isLogin){
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 1000);
        if(this.currentQty  < max){
          this.currentQty = this.currentQty + 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name,
            price:prod.selling_price,
          } 
          this._cartService.addToLocalCart(product,this.currentQty) 
          if(this.qtyRefresh){
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
        }else{
          this.dissableAdder = true
        }
        return
      }
      else{
        this.buttondissable = false
        setTimeout( () => { 
          this.buttondissable = false
        }, 1000);
        if(this.currentQty < max){
          this.currentQty =  this.currentQty + 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name
          }
          this._cartService.addToCart(product,this.currentQty) 
          if(this.qtyRefresh){
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
        }else{
          this.dissableAdder = true
        }
      }
    }else{
      if(!this.isLogin){
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 1000);
        if(this.currentQty < this.maxQty){
          this.currentQty = this.currentQty + 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name,
            price:prod.selling_price,
          } 
          this._cartService.addToLocalCart(product,this.currentQty) 
          if(this.qtyRefresh){
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
        }else{
          this.dissableAdder = true
        }
        return
      }
      else{
        this.buttondissable = true
        setTimeout( () => { 
          this.buttondissable = false
        }, 1000);
        if(this.currentQty < this.maxQty){
          this.currentQty = this.currentQty + 1
          let product = {
            id: prod.id,
            inventory_id: prod.inventory_id,
            image1: prod.image1,
            name:prod.name
          }
          this._cartService.addToCart(product,this.currentQty) 
          if(this.qtyRefresh){
            setTimeout(() => {
              window.location.reload()
            }, 500);
          }
        }else{ 
          this.dissableAdder = true
        }
      }
    }
  }

  remove(prod:any){
    if(!this.isLogin){
      this.buttondissable = true
      setTimeout( () => { 
        this.buttondissable = false
      }, 2000);
      this.currentQty = 0
      let varient_id = prod.id
      this._cartService.removeLocalCart(varient_id) 
      setTimeout(() => {
        window.location.reload()
      }, 500);
      return
    }else{
      this.buttondissable = true
      setTimeout( () => { 
            this.buttondissable = false
      }, 2000);
      this.currentQty = 0
      let varient_id = prod.id
      this._cartService.removeCart(varient_id) 
      // setTimeout(() => {
      //   window.location.reload()
      // }, 500);
    }
  }

  qty(i:number){
    // console.log(i);
    return new Array(i+1);  
  }  
  
  qtyMax(){
    // let minmum:any =2
    // let maximum:any=8
    // let s:any

    // for(s=minmum;s<=maximum;s++){
    //     let value={
    //       qty:s
    //     }
    //     this.qtyArray.push(value)
    // }
    // console.log(this.qtyArray,"this.qtyArray0000000000000000000000");
    // i=min
    // for(let j=min;j<=max;j++){
    //   i=j
    // }
    // return new Array(i+1);
  }

  qtyChanger(prod:any){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null ){
      let product = {
        id: prod.id,
        inventory_id: prod.inventory_id,
        image1: prod.image1,
        name:prod.name,
        price:prod.selling_price,
      } 
      this._cartService.addToLocalCart(product,this.currentQty)
     
    }else{
      let product = {
        id: prod.id,
        inventory_id: prod.inventory_id,
        image1: prod.image1,
        name:prod.name
      }
      this._cartService.addToCart(product,this.currentQty)
      // setTimeout( () => { 
      //   window.location.reload()
      // }, 800);
    }
     
  }

  maxAdd(min:any,max:any){
     let minmum:any =2
     let maximum:any=8
  }



  toggleLoading=()=>{
     this.isLoading=true
     setTimeout(() => {
      this.isLoading=false
     }, 2000);
  }

}
