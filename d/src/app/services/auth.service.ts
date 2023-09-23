import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { data2 } from 'src/assets/database/brand2';
import axios from 'axios';

let headers:any
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_payment=environment.api_payment
  api_user = environment.api_user
  api_cart_checkout = environment.api_cart_checkout
  api_inventory= environment.api_inventory
  api_finance=environment.api_finance
  api_promotion=environment.api_promotion
  api_delivery=environment.api_delivery
  // api_sidra_user = environment.api_sidra_user
  sidra_signup="/user-customer_customerusersignup/sidracart"
  forgotConfirmOtp = "/user-account_userforgotpasswordvarify?email="
  forgotPasswordApi = "/user-account_userforgotpasswordrequest?email="
  cartBulkUp = "/order/create-bulk-cart"
  userSignupData:any
  signUp = "/user-customer_customerusersignup"
  login = "/user-account_login"
  otp="/user-customer_customerusersignupvarify"
  profileData="/user-customer_customeruserupdate/"
  postProfileUpdate = "/user-customer_customeruserupdate/"
  addressGet = "/user-general_address"
  userAddressApi = "/user-general_getuseraddress?customer_usercode="
  addressCreate = "/user-general_address-creation"
  updateAddress = "/user-general_addressedit/"
  createNewPassword = "/user-account_usernewpswd?email="
  changePassword = "/user-account_userchangepassword"
  acceptConditionApi = "/contract/mutualcontractcreate"
  setDefualt = "/user-general_address_default"
  addresSendOtp="/user-account_phonenumber_otp/request"
  AddressOtpVarify="/user-account_varifyphonenumber"
  otpApi="/user-customer_customerusersignupvarify/sidracart"
  changePass="/user-account_userchangepassword/sidracart"
  otpRequest="/user-account_phonenumber_otp/request/sidracart"
  otpVerify="/user-account_varifyphonenumber/sidracart"
  stateList=""
  addresList="/user-general_getuseraddress/sidracart"
  updateAddressSidra="/user-general_addressedit/"
  forgotPass="/user-account_userforgotpasswordrequest/sidracart"
  default="/user-general_address_default"
  forgotPassVerify="/user-account_userforgotpasswordvarify/sidracart"
  deleteAddress=""
  userProfileInfo:any 
  addressData:any = []
  private apiBaseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

  locationSearch(data:any){
    headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }) 
    return this.http.get<any>("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+data+"&key=AIzaSyAd2NANL1HV8c7HnRuoNtWRjkncY-YPyhg",{headers})
  } 

  getDatasearchLoc(d:any) {
   axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+d+"&key=AIzaSyAd2NANL1HV8c7HnRuoNtWRjkncY-YPyhg").then((d:any)=>{
     
     
   })
  } 
  

  getAddressList(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      Authorization: `token ${tokens}`
    }) 
    return this.http.get<any>(this.api_user+this.addresList,{headers})
  }    
  
  accountLogOutAll(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      Authorization: `token ${tokens}`
    }) 
    return this.http.get<any>(this.api_user+"/user-account_logout-all",{headers})
  }   

  searchPicUpaddress(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_finance+"/delivery-manage/delivery-list?delivery_type=Collection%20Points&address="+data,{headers})
  }

  searchSugggestionForSidra(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>("https://api-uat-inventory.sidrabazar.com"+"/elastic_inventory/product-sujection?q="+data,{headers})
  }

  searchDataSidra(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_inventory+"/elastic_inventory/product-sujection?q="+data,{headers})
  }


  getHomeApi(pageApi:any){
    return this.http.get<any>(pageApi)
  }
  
  pickUpAddressBookMark(data:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }),
    this.http.post(this.api_finance+"/delivery-general/pickup-add-bookmark",data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.dontRefresh()
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    }) 
  } 
  
  pickUpAddressBookMarkRemove(data:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ` ${tokens}`
    }),
    this.http.post(this.api_finance+"/delivery-general/pickup-remove-bookmark",data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.dontRefresh()
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  getPickUpAddressList(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({ 
      Authorization: `${tokens}` 
    }) 
    return this.http.get<any>(this.api_finance+"/delivery-general/pickup-list-bookmark",{headers})
  }  
  
  getOfferProduct(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({ 
      Authorization: `${tokens}` 
    }) 
    return this.http.get<any>(this.api_promotion+"/display/get-products-for-my-offers?customer_group_code=null&page_type=web",{headers})
  }  

  sendOtpRequest(data:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }),
    this.http.post(this.api_user+this.otpRequest,data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.messager.sendOtp(data)
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
       
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  otpRquestVarify(data:any,pass:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }),
    this.http.post(this.api_user+this.otpVerify,data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
          this.sendChangePass(pass)
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  
  forgotPasswordsidra(data:any){
    // let user:any = localStorage.getItem('marketplaceUser') 
    // let userDetails = JSON.parse(user)
    // let tokens=userDetails.token 
    // headers=new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `token ${tokens}`
    // }),
    this.http.post(this.api_user+this.forgotPass,data).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
          this.messager.send(data.status)
      } 
      else{
          this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})  
          this.messager.send(data.status)  
      }  
    }) 
  }

  forgortPassSidraVerify(data:any){
    this.http.post(this.api_user+this.forgotPassVerify,data).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message)
        this.messager.send(data.status)
      }else{
        this.toaster.warning(data.message)
        this.messager.send(data.status)
      }
    })
  }

  makeUsDefaullt(data:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }), 
    this.http.patch(this.api_user+this.default,data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
          // this.sendChangePass(pass)
          setTimeout(() => {
            window.location.reload() 
          }, 300);
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  } 
//password changing

  sendChangePass(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    })
    this.http.post(this.api_user+this.changePass,data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }


  bodyMesure(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }) 
    this.http.post(this.api_user+"user-account_measurement",data,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }
//==========================

  getOtpDetails(){
    return this.userSignupData
  }
  getLocation(lat:any,log:any){
    return this.http.get<any>(`https://api.opencagedata.com/geocode/v1/json?key=AIzaSyCj_wxQO4xXnSM-tpRyASOMRfpQszpN-Ik=${lat}%2C+${log}&pretty=1&no_annotations=1`)
  }

  constructor(private http: HttpClient,private messager:MessengerService,private toaster: ToastrService,private router:Router) { 
    
  }

  getCountry(){
    return this.http.get<any>(this.api_user+'/country-list')
  }

  getCountryNew(){
    return this.http.get<any>(this.api_user+'/country-list?value=list')
  }

  getStateList(country:any){
    return this.http.get<any>(this.api_user+'/state-list?code='+country+'&value=list')
  }

  loginPost(auth:any){
    this.http.post(this.api_user+"/user-account_login/sidracart",auth).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        localStorage.setItem("marketplaceUser", JSON.stringify(data.data))
        let user:any = localStorage.getItem('marketplaceUser')
        let userDetails = JSON.parse(user) 
        this.toaster.success(data.message)
        this.messager.sendStatus(data.status)
        let CartData = localStorage.getItem('CartData')
        // if(CartData != null){
        //   let cart = JSON.parse(CartData)
        //   cart.user_id = userDetails.customer_usercode
        //   this.http.post(this.api_cart_checkout+this.cartBulkUp,cart).toPromise().then((data:any)=>{
        //     localStorage.removeItem('CartData')
        //   }).catch((d)=>{
        //     console.log(d,'error');
        //     // this.toaster.error(d.status);
        //   }) 
        // } 
      
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendStatus(data.status)
      }
    })
  }

  signupPost(signup:any){
    this.http.post(this.api_user+this.sidra_signup,signup).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        // this.userSignupData = data.data
        // console.log(this.userSignupData,"this.userSignupData");
        localStorage.setItem('userSignupdata',JSON.stringify(data.data))
        this.router.navigate(['/auth/otp'])
        this.messager.sendStatus(data?.status)
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
        this.messager.sendStatus(data?.status)
      }
    })
  }

  resend(signup:any){
    this.http.post(this.api_user+"/user-account_phonenumber_otp/request/sidracart",signup).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        // this.userSignupData = data.data
        // console.log(this.userSignupData,"this.userSignupData");
        // localStorage.setItem('userSignupdata',JSON.stringify(signup))
        this.router.navigate(['/auth/otp'])
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
      }
    })
  }

  resendforaddress(signup:any){
    this.http.post(this.api_user+"/user-account_phonenumber_otp/request/sidracart",signup).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        // this.userSignupData = data.data
        this.messager.sendOtpForAddressResend(data?.status)
        // console.log(this.userSignupData,"this.userSignupData");
        // localStorage.setItem('userSignupdata',JSON.stringify(signup))
        // this.router.navigate(['/auth/otp'])
      }else{ 
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
      }
    })
  }

  postSidra_otp(data:any){
    this.http.post(this.api_user+this.otpApi,data).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message) 
        localStorage.removeItem('userSignupdata')
        this.router.navigate(['/auth'])
      }else{  
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'}) 
      }
    }) 
  } 



  signupPostResend(signup:any){
    this.http.post(this.api_user+this.signUp,signup).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.messager.sendOtpValidate(data?.status)
      }else{
        this.toaster.warning(data.message)
      }
    })
  }

  postOtp(otpData:any){
    this.http.post(this.api_user+this.otp,otpData).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        localStorage.removeItem('signupData')
        this.toaster.success(data.message)

        this.userSignupData = data.data
        let newContract = {
          contract_data:[
            {
              renewel_period: "One time",
              is_active: true,
              status: "A",
              contract_note: "I agree to Ahlancart Terms and Conditions",
              contract_type_id_id: 1
            },
            {
              renewel_period: "One time",
              is_active: true,
              status: "A",
              contract_note: "I have read, I understand and acknowledge Ahlancart Privacy policy",
              contract_type_id_id: 1
            },
            {
              renewel_period: "One time",
              is_active: true,
              status: "A",
              contract_note: "I want to receive the latest offers from Ahlancart and its trusted partners via SMS and all other channels, ",
              contract_type_id_id: 1
            }
          ],
          party_data: [
            {
              fname: "Ansar",
              lname: "Abdulla",
              mobile_no: "+971 0565947777",
              email: "ansarykp@gmail.com",
              is_active: true,
              meta: null,
              party_type_id_id: 2
            },
            {
              fname: otpData.fname, 
              lname: otpData.lname, 
              mobile_no: otpData.mobile, 
              email: otpData.email, 
              is_active: true,
              meta: null,
              party_type_id_id: 1
            }
          ]
        }
        
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
      this.toaster.error(d.status);
    })
  }


  // acceptCondition(data:any){
  //   this.http.post(this.api_partner+this.acceptConditionApi,data).toPromise().then((data:any)=>{
      
  //     if(data?.status === 'success'){
  //       // this.toaster.success(data.message)
  //       this.router.navigate(['/auth'])
  //     }else{
  //       this.toaster.warning(data.message)
  //     }
  //   }).catch((d)=>{
      
  //     // this.toaster.error(d.status);
  //   })
  // }

  getUserProfile(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      Authorization: `token ${tokens}`
    })
    return this.http.get<any>(this.api_user+this.postProfileUpdate+userDetails?.customer_id,{headers})
  }

  getAddress(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData !=null){
      let userCode = {
        customer_usercode: userData.customer_usercode,
      } 
      this.http.post(this.api_user+this.addressGet,userCode).toPromise().then((data:any)=>{
        this.userProfileInfo = data.data
        this.messager.sendAddress(data.data)
        this.addressData = data.data
      }).catch((d)=>{
        // this.toaster.error(d.status);
      })
    }
  }

  getUserAddress(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    return this.http.get<any>(this.api_user+this.userAddressApi+userData.customer_usercode)
  } 

  createAddress(address:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `token ${tokens}`
    })
    this.http.post(this.api_user+this.addressCreate,address,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        // this.messager.sendaddressmodalclose()
        this.messager.sendOtp(data) 
        this.messager.dontRefresh()
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  } 

  avaliableLocation(address:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `${tokens}`
    })
    this.http.post(this.api_delivery+'/delivery-manage/delivery-check',address,{headers}).toPromise().then((data:any)=>{
      if(data.status == 'sucess'){
        // this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        // this.messager.sendaddressmodalclose()
        this.messager.sendOtp(data) 
        this.messager.dontRefresh()
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  } 

  updateSidraAddress(id:any,address:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `token ${tokens}`
    })
    this.http.patch(this.api_user+this.updateAddressSidra+id,address,{headers}).toPromise().then((data:any)=>{
      console.log("dadadadadaadadtatatatatatata",data);
      
      if(data?.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendOtp("success") 
        // this.userSignupData = data.data
        this.messager.dontRefresh()
        // this.messager.sendOtpVaidate(data.status) 
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }


  updateDeliveryAddress(address:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `${tokens}`
    })
    this.http.post(this.api_cart_checkout+"/order/cart-item-delivery-update",address,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendOtp("success") 
        // this.userSignupData = data.data 
        // this.messager.dontRefresh() 
        // this.messager.sendOtpVaidate(data.status) 
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  updateCartSingleProduct(id:any,d:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `${tokens}`
    })
    this.http.post(this.api_cart_checkout+"/order/update-cart/"+id,d,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendStatus("success") 
        // this.userSignupData = data.data 
        // this.messager.dontRefresh() 
        // this.messager.sendOtpVaidate(data.status) 
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  updateGetItTogether(address:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `${tokens}`
    })
    this.http.post(this.api_cart_checkout+"/delivery-manage/delivery-combine",address,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){ 
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendOtp("success") 
        // this.userSignupData = data.data 
        // this.messager.dontRefresh() 
        // this.messager.sendOtpVaidate(data.status) 
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }


  deleteSidraAddress(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    
    headers=new HttpHeaders({
      Authorization: `token ${tokens}`
    })
    this.http.delete(this.api_user+this.updateAddressSidra+id,{headers}).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.dontRefresh()
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }




  addresOtpSend(otpData:any){
    this.http.post(this.api_user+this.addresSendOtp,otpData).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message)
        this.messager.sendOtpVaidate(data.status)
      }else{
        this.toaster.warning(data.message)
      }
    })
  }
  addresOtpVarify(otpData:any){
    this.http.post(this.api_user+this.AddressOtpVarify,otpData).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message)
        this.messager.sendOtpSuccsess(data.status)
      }else{
        this.toaster.warning(data.message)
      }
    })
  }

  setDefualtAddress(defaultData:any){
    this.http.patch(this.api_user+this.setDefualt,defaultData).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        // this.toaster.success(data.message)
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }else{
        // this.toaster.warning(data.message)
        // this.toaster.warning(data.message)
      }
    })
  }

  updateUserAddress(address:any,id:any){
    this.http.patch(this.api_user+this.updateAddress+id,address).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message)
        this.messager.dontRefresh()
        this.messager.sendOtpVaidate(data.status) 
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
      // this.toaster.error(d.status);
    })
  }

  deleteUserAddress(id:any){
    this.http.delete(this.api_user+this.updateAddress+id).toPromise().then((data:any)=>{
      if(data?.status === 'success'){
        this.toaster.success(data.message)
        this.messager.dontRefresh()
      }else{
        this.toaster.warning(data.message)
      }
    }).catch((d)=>{
      // this.toaster.error(d.status);
    })
  }

  getUserProfileInfo(){
    this.getUserProfile()
    
    if(this.userProfileInfo === undefined){
      this.getUserProfile()
      return this.userProfileInfo
    }else{
      return this.userProfileInfo
    } 
  }


  profileUpdate(profile:any,id:number){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }),
    this.http.patch(this.api_user+this.postProfileUpdate+id,profile,{headers}).toPromise().then((data:any)=>{
      console.log("id@@@@@@@@@",id);
      
      console.log("profile@@@@@@@@@@",profile);
      console.log("dataprofile@@@@@@@@@@",data);
      
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messager.sendWithoutRefresh()
        // let user:any = localStorage.getItem("marketplaceUser")
        // let userData = JSON.parse(user)
        // userData.username = data.data.username 
        // localStorage.setItem("marketplaceUser", JSON.stringify(userData))
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500);

      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }


  profileDeativate(profile:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }),
    this.http.post(this.api_user+"/user-customer_customeruserdelete",profile,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        localStorage.clear()
        this.messager.sendWithoutRefresh()
        this.messager.sendpopupclose()
        // let user:any = localStorage.getItem("marketplaceUser")
        // let userData = JSON.parse(user)
        // userData.username = data.data.username 
        // localStorage.setItem("marketplaceUser", JSON.stringify(userData))
        // setTimeout(() => {
        //   window.location.reload()
        // }, 500);

      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }
  email_verify(data:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `tokens ${tokens}`
    }),
    this.http.post(this.api_user+"/user-account_update-phonenumber/initiated/sidracart",data,{headers}).toPromise().then((data:any)=>{
    this.messager.sendOtp(data)
    }) 
  }

  getProperAddress(){
    this.getAddress()
    setTimeout( () => { 
      return this.addressData
    }, 2000);
  }

  forgotPassword(email:any){
    let user:any = localStorage.getItem("marketplaceUser")
        let userData = JSON.parse(user)
    return this.http.get<any>(this.api_user+this.forgotPasswordApi+email)
  } 

  postForgotOtp(otpdata:any){
    return this.http.get<any>(this.api_user+this.forgotConfirmOtp+otpdata.email+'&key='+otpdata.otp)
  }

  createNewPasswordGet(forgotData:any){
    return this.http.get<any>(this.api_user+this.createNewPassword+forgotData.email+'&pwd='+forgotData.newPassword)
  }
  
  changeCurrentPassword(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `token ${tokens}`
    }),
    this.http.post(this.api_user+this.changePassword,data,{headers}).toPromise().then((data:any)=>{
      let user:any = localStorage.getItem('marketplaceUser')
      let userDetails = JSON.parse(user)
      if(data.status === 'success'){
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        localStorage.removeItem('marketplaceUser')
        setTimeout(() => {
          window.location.reload()
        }, 500);
        this.router.navigate(['/auth'])
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    }).catch((d)=>{
      this.toaster.error(d.status);
    })
  }

  Options7() {
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${tokens}`,
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    };
    return httpOptions;
  }

  carddelete(id:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    }),
    this.http.post(this.api_payment+"/payment/network/user-saved/cards/delete/"+id,null,{headers}).toPromise().then((data:any)=>{
      if(data?.status == 'success'){
        this.messager.dontRefresh()
        this.toaster.success(data.message,'',{positionClass: 'toast-bottom-center'})
        
      }else{
        this.toaster.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  
}
