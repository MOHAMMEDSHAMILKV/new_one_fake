import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { MessengerService } from './messenger.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  api_cart_checkout = environment.api_cart_checkout
  notification = "/order/list-notification/"
  cancelNotification = "/order/cancel-NotificationUser/"
  notifySettingCreate = "/order/create-CreateNotificationUser"
  getNotifySetting = "/order/list-notificationupdates/DESKTOP_NOTIFICATION/"
  api_user = environment.api_user

  constructor(private http:HttpClient,private msg:MessengerService) { }

  getNotify(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    return this.http.get<any>(this.api_cart_checkout + this.notification + userDetails.customer_usercode)
  }
  cancelNofication(id:any){
    this.http.delete(this.api_cart_checkout+this.cancelNotification+id).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.msg.dontRefresh()
      }else{
      }
    })
  }
  getSidraNotification(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
   let headers=new HttpHeaders({ 
      Authorization: `token ${tokens}` 
    }) 
    return this.http.get<any>(this.api_user+"/notification/user-notification",{headers})
  }  

  notificationPost(d:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({ 
        Authorization: `token ${tokens}` 
      }) 
    this.http.post(this.api_user+"/notification/user-update",d,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.msg.dontRefresh()
      }else{
      }
    })
  }
  notificationActives(d:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({ 
        Authorization: `token ${tokens}` 
      }) 
    this.http.post(this.api_user+"/user-general_user-settings",d,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.msg.dontRefresh()
      }else{
      }
    })
  }

  norificationSetting(data:any){
    this.http.post(this.api_cart_checkout+this.notifySettingCreate,data).toPromise().then((data)=>{
      // this.toastr.success('success','',{timeOut:3000});
    }).catch((d)=>{
        // this.toastr.error(d.error.data.validation_details[0].message[0], ' ', { timeOut: 3000, })
    })
  }
  getNotifySettings(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    return this.http.get<any>(this.api_cart_checkout+this.getNotifySetting+userDetails.customer_usercode)
  }
}
