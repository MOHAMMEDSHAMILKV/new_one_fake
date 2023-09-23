import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { MessengerService } from './messenger.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { ThrowStmt } from '@angular/compiler';
let headers:any
@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  api_cart_checkout = environment.api_cart_checkout
  api_inventory= environment.api_inventory
  api_finance=environment.api_finance
  api_promotion=environment.api_promotion
  api_delivery=environment.api_delivery
  createCart ="/order/create-cart"
  getCartData = "/order/list-cart-by-customer/"
  removeCartData = "/order/RemovecartbyCustomer"
  saveForLaterData = "/order/create-SaveforLater"
  removeSaveForLater = "/order/cancel-SaveforLater"
  moveToCart = "/order/movetocart"
  buyItAgain = "/order/list-buy-it-again/"
  getSaveForLaterData = "/order/list-save-for-later/"
  cartCount="/order/check-cart-variant/"
  inCart="/order/check-cart-variant/"
  cartData:any = [] 
  localCart:any = { 
    user_id: 0,
    cart_products: <any>[] 
  }
  cart:Cart[] = []
  checkoutArray:any = []
  dataKey="cartData"
  cartDataMainArray:any=[]
  withOutLoginArray:any=[]

  constructor(private msg: MessengerService, private router:Router, private http: HttpClient,private toaster: ToastrService,) { 
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    if(userDetails == null){
      return
    } else{
      let cart = this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails.customer_usercode)
      cart.subscribe((data:any)=>{
        this.cartData = data.data
      })
    }
    
  }

  getCartCount(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    return this.http.get<any>(this.api_cart_checkout+this.cartCount+userDetails?.customer_usercode)
  }
  checkInCart(variant_id:any,inventory:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    return this.http.get<any>(this.api_cart_checkout+this.inCart+userDetails?.customer_usercode+'?variant_id='+variant_id+'&inventory='+inventory)
  }

  getCartValue(){
    return this.cartData
  }
  getCart(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    return this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails?.customer_usercode)
    
  }

  getsidraCart(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-cart-by-customer",{headers})
  }

  getSegmant(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/display/list-segments",{headers})
  }

  getCartProduct(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-cart-variantes",{headers})
  }


  getAllCategory(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>("https://api-uat-inventory.sidrabazar.com"+"/display/list-all-categories-by-segmentation-clone/"+name,{headers})
  }


  getAllSubcategory(segmentname:any,code:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>("https://api-uat-inventory.sidrabazar.com"+"/display/list-subcategories-for-all-categories-for-web/"+segmentname+'/'+code,{headers})
  }


  getDefaultAddress(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>("https://api-rgc-deliverymanage.hilalcart.com/delivery-manage/default-delivery",{headers})
  }



  getdefaultLocation(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post("https://api-uat-user.sidrabazar.com/address-geo-values",data,{headers}).toPromise().then((data:any)=>{
      if(data.status == 'success'){ 
        // this.toaster.success(data.message)
        this.msg.send(data.data)  
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  } 

  BulkUploading(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/create-bulk-cart",data,{headers}).toPromise().then((data:any)=>{
      if(data.status == 'success'){ 
        // this.toaster.success(data.message)
        this.msg.send(data.data)  
        localStorage.removeItem('cartData')
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  } 
  
  addToCart(product:any,qty:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    })
    let cartData = {
      variant_id: product.id,
      inventory_id: product.inventory_id, 
      // image: product.image1,
      name: product.name,
      quantity: parseInt(qty),
      item_type:"products",
      product_params: product
    }
    this.http.post(this.api_cart_checkout+"/order/create-cart",cartData,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.dontRefresh()
        this.http.get<any>("https://api-uat-cart-checkout.sidrabazar.com/order/list-cart-by-customer",{headers}).subscribe((d:any)=>{
          this.msg.cartCount(data.data?.results.length)
        })
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        // setTimeout(() => {
        //   window.location.reload()
        // }, 200);
      }
    })
  }

  addToCartsample(product:any,qty:any,prod:any){
    let cartData = {
      variant_id: prod.variant_id,
      inventory_id: product.inventory_id, 
      // image: product.image1,
      name: product.name, 
      quantity: parseInt(qty), 
      item_type:"products",
      product_params: prod 
    }
    
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/create-cart",cartData,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message)  
        this.msg.dontRefresh()   
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        // setTimeout(() => {  
        //   window.location.reload()    
        // }, 200);
      }  
    })
  }

  addToCartQuantityUpdate(product:any,qty:any,prod:any){
    let cartData = {
      variant_id: prod.variant_id,
      inventory_id: product.inventory_id, 
      // image: product.image1,
      name: product.name, 
      quantity: parseInt(qty), 
      item_type:"products",
      product_params: prod 
    }
    
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/create-cart",cartData,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message)  
        // this.msg.dontRefresh()   
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        // setTimeout(() => {  
        //   window.location.reload()    
        // }, 200);
      }  
    })
  }





  addToCartsampleForLater(product:any,qty:any,prod:any){
    let cartData = {
      variant_id: prod.variant_id,
      inventory_id: product.inventory_id, 
      // image: product.image1,
      name: product.name, 
      quantity: parseInt(qty), 
      item_type:"products",
      product_params: prod ,
      is_savefor_latter:true
    }
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/create-cart",cartData,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message)  
        this.msg.dontRefresh()   
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        // setTimeout(() => {  
        //   window.location.reload()    
        // }, 200);
      }  
    })
  }
  addToLocalCart(product:any,qty:number){
    let storedData:any=[]
    storedData=this.getAdd()
    let cartItem:any = {
      variant_id: product.id,
      inventory_id: product.inventory_id,
      image: product.image1,
      name: product.name,
      quantity: qty,
      price:product.selling_price,
      total_price: product.selling_price * qty,
      max_order_limit:product.max_order_limit,
      min_order_limit:product.min_order_limit,
      stock_count:product.stock_count, 
      inventory_name:product.inventory_name, 
      estimated_delivery:product.estimated_delivery
    } 
    storedData.push(cartItem) 
    localStorage.setItem(this.dataKey,JSON.stringify(storedData))
    let history:any =  localStorage.getItem(this.dataKey) 
    this.withOutLoginArray = JSON.parse(history)
    this.msg.cartCount(this.withOutLoginArray.length)
    this.msg.dontRefresh() 
    let cart:any =  localStorage.getItem('cartData')
    let cartDataMain:any = JSON.parse(cart)
    console.log(cartDataMain);
    let finalprice:any = cartDataMain.reduce(function(prev:any, cur:any) {
      return prev + cur.total_price;
    }, 0); 
    console.log(finalprice,cartDataMain);
    this.msg.sendPriceUpdate(finalprice)  
  } 
  
  deliveryTime(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_delivery+"/delivery-manage/delivery-options?exclude_pickup=True",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'sucess'){ 
        // this.toaster.success(data.message)
        console.log(data); 
        this.msg.processStart(data.data)  
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  }  
  
  OrderCreate(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    localStorage.setItem("orderProductDetail", JSON.stringify(data))
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_cart_checkout+"/order/order-create",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        localStorage.setItem("orderData", JSON.stringify(data.data))
        this.msg.processStart(data.data)   
        this.msg.sendStatus(data.status)
        this.router.navigate(['/checkout/'+'notdirect'])
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.msg.sendStatus(data.status)
      }  
    }) 
  }  


  OrderCreateDirect(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_cart_checkout+"/order/direct-buy-product",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        this.toaster.success(data.message) 
        localStorage.setItem("orderData", JSON.stringify(data.data))
        localStorage.setItem("orderProductDetail", JSON.stringify(data.data))
        this.msg.processStart(data.data)   
        this.router.navigate(['/checkout/'+'direct'])
      }else{  
        this.toaster.warning(data.message) 
      }  
    })
  }   


  getGiftData(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_inventory+"/display/get-gift-option",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        
        this.msg.sendOrderResponse(data.data)
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  }    

  couponForsingle(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_promotion+"/display/list-coupon-by-variant",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        
        this.msg.sendcoupon(data)
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  }  

  couponApply(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_promotion+"/coupon/apply-coupon",data,{headers}).toPromise().then((data:any)=>{
      if(data.status == 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.msg.sendOrderResponse(data.data)
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
      }  
    })
  }  


  
  deleteCoupon(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_promotion+"/coupon/cancel-coupon",data,{headers}).toPromise().then((data:any)=>{
      if(data.status == 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.msg.sendOrderResponse(data.data)
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
      }  
    })
  }  


  deleteGiftCard(id:any,data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_cart_checkout+"/order/delete-order-type/"+id,data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.msg.dontRefresh()
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  } 


  giftOptioneApply(id:any,data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({ 
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post(this.api_cart_checkout+"/order/update-order/"+id,data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message)
        this.msg.send(data)
        this.msg.dontRefresh()
      }else{   
        // this.toaster.warning(data.message) 
      }  
    })
  } 

  getGiftDataWrap(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    this.http.post("https://api-uat-service.sidrabusiness.com/service-display/get-gift-option",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.msg.dontRefresh()
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  }
  
  getGiftProduct(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/order-data?order_id="+id,{headers})
  }



  getGiftedProduct(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/update-order-2/"+id+"?lines_type=gift option",{headers})
  }

  getSingleProduct(d:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/display/single-variant-detials/"+d,{headers})
  }


  getSameProduct(d:any){
    return this.http.get<any>("https://api-uat-inventory.sidrabazar.com/"+"display/same-products-for-single_page/"+d,{headers})
  }
  
  getSimilarPro(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/display/similar-poducts/"+id,{headers})
  }

  getRelatedPro(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/display/get-similarity-recommendation-products/"+id,{headers})
  }

  saveForLater(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/create-save-for-later",e,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.dontRefresh()
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  CancelForLater(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/cancel-save-for-later",e,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.dontRefresh()
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  getSaveLater(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-save-for-later",{headers})
  }

  removeSaveForLaterData(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let saveForLater = {
      user_id: userDetails.customer_usercode,
      variant_id: e, 
    }
    this.http.post(this.api_cart_checkout+this.removeSaveForLater,saveForLater).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success("Removed")
        this.msg.dontRefresh()
        this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails.customer_usercode).subscribe((data:any)=>{
          this.msg.cartCount(data.data.length)
        })
        let cartList:any=[]
       let cartArray:any =[]
       let totalCart=0
       let savedTotal=0
 
        this.getCart().subscribe((cartList:any)=>{
          cartList = cartList.data
          cartArray = [...cartList]
          cartList.forEach((data:any) => {
          totalCart += data.total_price 
          this.msg.cartPrice(totalCart)
          })
         cartList.forEach( (data:any)=> {
            savedTotal += ((data.total_price * data.quantity) - (data.total_price * data.quantity))
          })  

        })
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  moveToCartFromSaveForLater(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let saveForLater = {
      user_id: userDetails.customer_usercode,
      variant_id: e, 
    }
    this.http.post(this.api_cart_checkout+this.moveToCart,saveForLater).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success("Moved to Cart")
        this.msg.dontRefresh()
        let cartList:any=[]
        let cartArray:any =[]
        let totalCart=0
        let savedTotal=0
  
         this.getCart().subscribe((cartList:any)=>{
           cartList = cartList.data
           cartArray = [...cartList]
           cartList.forEach((data:any) => {
           totalCart += data.total_price 
           this.msg.cartPrice(totalCart)
           })
          cartList.forEach( (data:any)=> {
             savedTotal += ((data.total_price * data.quantity) - (data.total_price * data.quantity))
           })  
 
         })
      }
    })
  }

  removeCart(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let removeCartItem = {
      user_id:userDetails.customer_usercode, 
      variant_id:e
    }
    this.http.post(this.api_cart_checkout+this.removeCartData,removeCartItem).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success("Removed Item")
        this.msg.dontRefresh()
        this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails.customer_usercode).subscribe((data:any)=>{
          this.msg.cartCount(data.data.length)
        })
        let cartList:any=[]
        let cartArray:any =[]
        let totalCart=0
        let savedTotal=0
  
         this.getCart().subscribe((cartList:any)=>{
           cartList = cartList.data
           cartArray = [...cartList]
           cartList.forEach((data:any) => {
           totalCart += data.total_price 
           this.msg.cartPrice(totalCart)
           })
          cartList.forEach( (data:any)=> {
             savedTotal += ((data.total_price * data.quantity) - (data.total_price * data.quantity))
           })  
 
         })
        // setTimeout( () => { 
        //   window.location.reload()
        // }, 2000);
    
      }
    })
  }

  getSaveForLater(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    return this.http.get<any>(this.api_cart_checkout+this.getSaveForLaterData+userDetails.customer_usercode)
  }

  removeSidraCart(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    })
    let removeCartItem = {
      variant_id:e
    }
    this.http.post(this.api_cart_checkout+"/order/RemovecartbyCustomer",removeCartItem,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success("Removed Item",'',{positionClass: 'toast-bottom-center'})
        this.msg.dontRefresh()
      }
    })
  }


  postCombinedProducts(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_delivery+"/delivery-manage/delivery-combine",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message)
        this.msg.sendMessage(data.data)  
      }else{  
        // this.toaster.warning(data.message) 
      }  
    })
  }


  postGetTogether(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
      headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/cart-item-delivery-update",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        // this.toaster.success(data.message)
        this.msg.sendMessage(data.data)  
      }else{   
        // this.toaster.warning(data.message)  
      }  
    })
  }


  getBuyItAgain(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    
    return this.http.get<any>(this.api_cart_checkout+this.buyItAgain+userDetails.customer_usercode)
  }

  addCheckout(data:any){
    this.checkoutArray = data
    // this.router.navigate(['/checkout'])
  }

  getCheckoutData(){
    return this.checkoutArray
  }
  
  removeLocalCart(e:any){
    let CartData = localStorage.getItem('CartData')
    let index:any
    if(CartData != null){
      let cart = JSON.parse(CartData)
      this.localCart = cart
      let i = 0
      this.localCart.cart_products.filter((data:any)=>{
        if(data.variant_id === e){
          this.localCart.cart_products.splice(i,1)
          localStorage.removeItem('CartData')
          let cartData = JSON.stringify(this.localCart)
          localStorage.setItem('CartData',cartData)
          return
        }
        i++
      })
      
    }
  }


   

  getAdd(){
    let history:any =  localStorage.getItem(this.dataKey)
    this.withOutLoginArray = JSON.parse(history)
    if(this.withOutLoginArray==null){
      this.withOutLoginArray=[]
    } 
    // let storedData:any =localStorage.getItem (JSON.parse(this.dataKey));
    return this.withOutLoginArray; 
  } 

  ProductExist(variant_id:any) {
    return this.localCart.cart_products.some(function(el:any) {
      return el.variant_id === variant_id;
    }); 
  }

  getLocalCart(){
    let CartData = localStorage.getItem('CartData')
    if(CartData != null){
      let cart = JSON.parse(CartData)
      this.localCart = cart
    }
    return this.localCart
  }

  
  
}
