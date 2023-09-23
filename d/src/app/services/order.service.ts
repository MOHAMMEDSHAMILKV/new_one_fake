import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessengerService } from './messenger.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) 
export class OrderService {
  api_payment = environment.api_payment
  api_cart_checkout = environment.api_cart_checkout
  deliveryCharge = "/order/order-line-slot-update/"
  getOrderSlots = "/order/list-delivery?address_id="
  orderCreate = "/order/OrderCreate"
  orderGet = "/order/list-order-by-customer/"
  orderCancel = "/order/order-cancel"
  orderReturn = "/order/CreateProductReturn"
  payment = "/payment/network/card-payment"
  paymentcod = "/payment-general/cod/complete-payment"
  orderDetailed = "/order/order-specific-details?order_id="
  returnProduct="/order/create-product-return"
  getCartData = "/order/list-cart-by-customer/"
  orderResponse:any 
  orderData="/order/order-data?"
  newpayment="https://api-payments-uat.ahlancart.com/payment/network/payment-initiate"
  paymentStatusMessage="https://api-payments-uat.ahlancart.com/payment/network/payment-complete"
  constructor(private messager:MessengerService, private router:Router, private http: HttpClient,private toaster: ToastrService,) { }
  
  order_data(order_id:any,customerCode:any){
    return this.http.get<any>(this.api_cart_checkout+this.orderData+'order_id='+order_id+'&'+'customer_id='+customerCode)
  }

  deliveryPrice(orderId:any,userId:any,slotId:any){
    return this.http.get<any>(this.api_cart_checkout+this.deliveryCharge+orderId+'?customer_id='+userId+'&slot_id='+slotId)
    // =244&&customer_id=40&slot_id=2
  }
  orderSlot(id:any,orderid:any){
    return this.http.get<any>(this.api_cart_checkout+this.getOrderSlots+id+'&'+'order_id='+orderid)
  }
  orderSubmit(order:any){
    this.http.post(this.api_cart_checkout+this.orderCreate,order).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.orderResponse = data.data
        this.messager.sendOrderResponse(data)
        // this.toaster.success(data.message)
        setTimeout( () => { 
          this.router.navigate(['/checkout'])
        }, 1000);
      }else{
        this.toaster.warning(data.message)
        this.router.navigate(['/cart'])
        
      }
    })
  }
  getOrderResponse(){
    return this.orderResponse
  }
  getOrder(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    return this.http.get<any>(this.api_cart_checkout+this.orderGet+userDetails.customer_usercode)
  }
  cancelOrder(data:any){
    this.http.post(this.api_cart_checkout+this.orderCancel,data).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message)
        this.messager.dontRefresh()
        // setTimeout( () => { 
        //   window.location.reload()
        // }, 1000);
      }
    })
  }
  returnOrder(data:any){
    this.http.post(this.api_cart_checkout+this.returnProduct,data).toPromise().then((data:any)=>{
      
      if(data.status === 'success'){
        this.messager.processStart('true')
        this.toaster.success("Order Returned")
        this.messager.dontRefresh()
        setTimeout( () => { 
          window.location.reload()
        }, 1000);
      }
    })
  }
  orderPayment(data:any){
    this.http.post(this.api_payment+this.payment,data).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success("Payment success")
        this.router.navigate(['/order-success'])
        let user:any = localStorage.getItem('marketplaceUser')
        let userDetails = JSON.parse(user) 
        this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails.customer_usercode).subscribe((data:any)=>{
          this.messager.cartCount(data.data.length)
        })
        // setTimeout( () => {    
        //   window.location.reload()
        // }, 2000);
      }else{
        
        this.messager.sendFailedData(data)
      }
    })
  }
  
  
  newOrderPayment(data:any){
    this.http.post(this.newpayment,data).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        // this.toaster.success("Payment success")
        localStorage.setItem("payment_reference", JSON.stringify(data?.data?.payment_reference))
        let user:any = localStorage.getItem('marketplaceUser')
        let userDetails = JSON.parse(user) 
        this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails.customer_usercode).subscribe((data:any)=>{
          this.messager.cartCount(data.data.length) 
        })  
        let payment:any = localStorage.getItem('payment_reference')
        let paymentRference = JSON.parse(payment) 
        let url=data.data.payment_redirect?.href
        window.open(url,"_self")
        
        // this.router.navigateByUrl(url)
        // this.router.navigate(['/order-success'])
        // setTimeout( () => {    
        //   window.location.reload()
        // }, 2000);
      }else{
        this.messager.sendFailedData(data)
      }
    })
  }

  paymentStatus(data:any){
    this.http.post(this.api_payment+"/payment/network/payment-complete",data).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        // this.toaster.success("Payment success")
        this.messager.sendPaymentStatus(data.status) 
        // this.router.navigate(['/order-success'])
        // setTimeout( () => {    
        //   window.location.reload() 
        // }, 2000);
      }else{
        this.messager.sendPaymentStatus(data.status)
      }
    })
  }


  orderPaymentCod(data:any){
    this.http.post(this.api_payment+this.paymentcod,data).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success("Order Placed Successfully")
        this.messager.sendStatus(data.status)
        this.router.navigate(['/succes_cashon'])
        let user:any = localStorage.getItem('marketplaceUser')
        let userDetails = JSON.parse(user) 
        this.http.get<any>(this.api_cart_checkout+this.getCartData+userDetails.customer_usercode).subscribe((data:any)=>{
          this.messager.cartCount(data.data.length)
        })
        // setTimeout( () => { 
        //   window.location.reload()
        // }, 2000);
      }
    })
  }


  freeDelivery(data:any){
    
  }
  getGetOrderReceipt(id:any){
    return this.http.get<any>(this.api_cart_checkout+this.orderDetailed+id)
  }

  OrderCreateSidra(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/order-create",e,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  walletCreation(e:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_payment+"/wallet/create-walletpayment",e,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }


  ListCard(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({    
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    }) 
    return this.http.get<any>(this.api_payment+"/payment/network/user-saved-cards",{headers})
  }  

  cardsave(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_payment+"/payment/network/payment-initiate",name,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
        localStorage.setItem("payment_reference", JSON.stringify(data?.data?.payment_reference))
        let url=data.data.payment_redirect?.href
        window.open(url,"_self")
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      } 
    })
  }



  cashOnDelivey(name:any,id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_payment+"/payment-general/cod/complete-payment",name,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
        this.router.navigate(['/order-success/'])
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  allOrderList(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-order-by-customer?status_search=",{headers})
  }


  allOrderListFilter(d:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-order-by-customer?status_search="+d,{headers})
  }
  
  getBuyItAgain(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-buy-it-again",{headers})
  } 
  
  singleDetails(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/list-order-lines-order?order_line_id="+id,{headers})
  } 

  getOrderDetail(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/order-data?order_id="+id,{headers})
  }
  
  trackingDetail(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/order-tracking/"+id,{headers})
  } 


  cancelorder(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/order-cancel",name,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
        this.messager.sendStatus(data.status)
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendStatus(data.status)
      }
    })
  } 


  returnOrderandReplace(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_cart_checkout+"/order/create-product-return",name,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
        this.messager.sendStatus(data.status)
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendStatus(data.status)
      }
    })
  } 

  bankAdding(name:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
     let headers=new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `${tokens}` 
    }) 
    this.http.post(this.api_payment+"/payment-general/user-account-details",name,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.dontRefresh()
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  } 

  getBankDetails(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_payment+"/payment-general/user-account-details",{headers})
  }

  download_Invoice(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/order/order-line/"+id+"/download",{headers})
  }

}     