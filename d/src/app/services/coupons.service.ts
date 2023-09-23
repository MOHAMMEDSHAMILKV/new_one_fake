import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment'; 
import { MessengerService } from './messenger.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  api_promotion = environment.api_promotion
  couponAvailable = "/coupon/coupon"
  couponApply = "/coupon/apply"
  couponAvailableOnUser= "/coupon/usercoupon?userlogin_id="
  couponPurchase="/coupon/couponpurchase"
  offerList = "/discount/list-offer-lines-by-content-type?content_type="
  couponsAhlan="https://api-promotion-uat.ahlancart.com/coupon/list"
  couponDetail="https://api-promotion-uat.ahlancart.com/coupon/list?code="
  couponDiscount:any
  
  constructor(private http: HttpClient,private toaster: ToastrService,
              private msg:MessengerService) {  }


  getOfferList(type:any,id:any){
    return this.http.get<any>(this.api_promotion+this.offerList+type+'&content_id='+id)
  }

  getCoupons(){
    return this.http.get<any>(this.api_promotion+this.couponAvailable)
  }

  getUsersCoupon(id:any){
    return this.http.get<any>(this.api_promotion+this.couponAvailableOnUser+id)
  }

  applyCoupon(data:any){
    this.http.post(this.api_promotion+this.couponApply,data).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message)
        this.couponDiscount = data.data
        this.msg.sendCoupons(this.couponDiscount)
      }else{
        this.toaster.warning(data.message)
        // this.toaster.warning(data.message)
        
      }
    })
  }

  purchaseCoupon(data:any){
    let coupondata = {
      coupon_list:[  
        {  
          id: data.id,  
          is_purchased:true, 
          userlogin_id:data.userId 
        }  
      ] 
    }
    this.http.post(this.api_promotion+this.couponPurchase,coupondata).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
      this.toaster.error(d.status);
    })
  }

  getCouponDiscount(){
    return this.couponDiscount
  }

  getCouponsAhlan(){
    return this.http.get<any>(this.couponsAhlan)
  }

  getCouponDetails(code:any){
    return this.http.get<any>(this.couponDetail+code)
  }

}
