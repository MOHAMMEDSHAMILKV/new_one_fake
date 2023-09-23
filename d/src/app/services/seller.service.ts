import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessengerService } from './messenger.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  api_cart_checkout = environment.api_rating
  api_check_reviewable = environment.api_cart_checkout
  api_user = environment.api_user
  api_inventory= environment.api_inventory
  api_finance=environment.api_finance
  api_promotion=environment.api_promotion
  api_loyality=environment.api_loyality
  api_rating=environment.api_rating
  api_payment=environment.api_payment
  api_Finance="https://api-finance-uat.ahlancart.com"
  api_Loyality="https://api-loyality-uat.ahlancart.com"
  accountCreator = "/partner/seller_partner-sellerpartnercreate"
  getWalletPerUser="/loyality/card/user-loyality-card/"
  user_transaction="/loyality/transaction/user-transactions/"
  user_transaction_credit="/loyality/transaction/user-transaction-credit/"
  deactive="/user-customer_customeruserdelete"
  stepOne:any 
  stepTwo:any 
  stepThree:any

  constructor(private router:Router, 
              private http: HttpClient,
              private toaster: ToastrService,
              private msg:MessengerService) { }

  getFirstStep(){
    return this.stepOne
  }
  getSecondStep(){
    return this.stepTwo
  }
  postStepOne(data:any){
    this.stepOne = data
  }
  postStepTwo(data:any){
    this.stepTwo = DataTransferItem
  }
  postStepThree(data:any){
    this.stepThree = data
  }
  // postSellerCreation(){
  //   let accountCreator = {
  //     ...this.stepOne,
  //     ...this.stepTwo,
  //     ...this.stepThree
  //   } 
  //   this.http.post(this.api_partner+this.accountCreator,accountCreator).toPromise().then((data:any)=>{
  //     if(data.status === 'success'){
  //       this.toaster.success("Added to cart")
  //     }
  //   })
  // }

  getwalletDetail(id:any){
    return this.http.get<any>(this.api_Loyality+this.getWalletPerUser+id)
  }

  getwalletTransaction(id:any){
    return this.http.get<any>(this.api_Loyality+this.user_transaction+id)
  }

  getwalletTransactionByCredit(id:any){
    return this.http.get<any>(this.api_Loyality+this.user_transaction_credit+id)
  }

  deaActivateAccount(customer_code:any){
    this.http.post(this.api_user+this.deactive,customer_code).toPromise().then((data:any)=>{
       if(data.status == 'success'){
        this.toaster.success(data.message)
        setTimeout(() => {
          window.location.reload()
        }, 200);
       }else{
        this.toaster.warning(data.message)
       }
    })
  }

  saveCard(d:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({ 
      Authorization: ` ${tokens}` 
    }) 
    this.http.post(this.api_payment+"/payment/network/user-card-save",d,{headers}).toPromise().then((data:any)=>{
      if(data.status == 'success'){
       this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'}) 
       let url=data.data.payment_redirect.href
       window.open(url,"_self");
       this.msg.dontRefresh()
       this.msg.sendStatus(data)
      }else{
       this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
   })
  } 

  getcardDetails(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
   let headers=new HttpHeaders({ 
      Authorization: ` ${tokens}` 
    }) 
    return this.http.get<any>(this.api_payment+"payment/network/user-card-save",{headers})
  }

}
