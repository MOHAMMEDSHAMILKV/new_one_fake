import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  api_design_layout = environment.api_design_layout
  api_account=environment.api_finance
  headerSlot_3 = "/design/list-slotblock/Deals/Header_slot3/" 
  mainSlot_1 = "/design/list-slotblock/Deals/Main_slot1/" 
  mainSlot_2 = "/design/list-slotblock/Deals/Main_slot2/" 
  mainSlot_3 = "/design/list-slotblock/Deals/Main_slot3/" 
  mainSlot_4 = "/design/list-slotblock/Deals/Main_slot4/" 
  mainSlot_5 = "/design/list-slotblock/Deals/Main_slot5/" 
  mainSlot_6 = "/design/list-slotblock/Deals/Main_slot6/" 
  mainSlot_7 = "/design/list-slotblock/Deals/Main_slot7/"
  mainSlot_8 = "/design/list-slotblock/Deals/Main_slot8/" 
  mainSlot_9 = "/design/list-slotblock/Deals/Main_slot9/"  
  getMesurment="https://api-rgc-cartcheckout.hilalcart.com/user-account_measurement"
  api_user = environment.api_user

  constructor(private http: HttpClient,private toaster: ToastrService,) { }

  getDealHeaderSlotThree(type:any){
    return this.http.get<any>(this.api_design_layout+this.headerSlot_3+type)
  }

  getUserMesurment(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }) 
    return this.http.get<any>(+this.api_user+"/user-account_measurement",{headers})
  }

  getWallet(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
     let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    }) 
    return this.http.get<any>(this.api_account+"/wallet/user-wallet",{headers})
  }


  

  getDealMainSlotOne(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_1+type)
  }
  getDealMainSlotTwo(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_2+type)
  }
  getDealMainSlotThree(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_3+type)
  }
  getDealMainSlotFour(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_4+type)
  }
  getDealMainSlotFive(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_5+type)
  }
  getDealMainSlotSix(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_6+type)
  }
  getDealMainSlotSeven(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_7+type)
  }
  getDealMainSlotEight(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_8+type)
  }
  getDealMainSlotNine(type:any){
    return this.http.get<any>(this.api_design_layout+this.mainSlot_9+type)
  }
}
