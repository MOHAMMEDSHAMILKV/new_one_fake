import { Component, OnInit,AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit,AfterViewInit {
  isLogin = false
  addNew = false
  edit_address:any = {}
  isEditAddress=false
  shippingAddress:any
  billingAddress:any
  changeBillingAddress = false
  shippingAddressIdPlaceholder = "shippingAddress"
  billingAddressIdPlaceholder = "billingAddress"
  addAdress!: FormGroup;
  isAddress = false
  specialGroups = "bulk"
  cartArray:any =[]
  currency = "AED"
  typeCart="CART";
  typeWish="WISH";
  buy="BUY"
  typeLater="LATER";
  recomandedProduct:any = []
  loader = false
  buildingno=""

  street:any 
  buildingname:any 
  city:any 
  address:any 
  contact:any 
  mobile:any 
  pincode:any 
  country:any="UAE" 
  state:any 
  landmark:any 
  location:any 
  area:any 
  time:any 
  saveUserNameCheckBox:any
  contactMobile:any=""
  totalCart=0
  savedTotal=0
  buyAgainList:any=[]
  cartList:any=[]
  wishList:any=[]
  saveLater:any=[]
  userDetailAdress:any 
  buyAgainListStatus=false
  qty:any=[];
  display=false
  timeLeft = 30
  subscribeTimer = 30
  addressCreateOtp=""
  addressCreateCartPage=""
  cartpageDisplay=false
  updateAddressOtp=false
  addressUpdateOtp=""
  userDetail:any
  cartShow=false
  changeNumber=false
  languageShow:any
  cartDataMain:any=[]
  cartProductImage:any=[
    {"image1":"../../../assets/products/prod1.svg"},
    {"image1":"../../../assets/products/prod2.svg"},
    {"image1":"../../../assets/products/prod3.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod5.svg"},
  ]
  sidracartarray:any=[]
  addressList:any=[]
  isCart=true
  isInstantCart=false
  cartHeadingActive=true
  InstantcartHeadingActive=false
  finalprice:any
  active1:any
  active2:any
  checkOutOrderData:any
  orderProductDetail:any=[]
  isSaveForLatertrue=false
  freeShipNote:any
  isLoading=false
  is_loading_orderCreate=false 
  disabledAdder=false

  ngOnInit(): void {
    let user:any = localStorage.getItem("marketplaceUser")
    this.userDetail = JSON.parse(user) 
    if(this.userDetail!=null){
      var myString = '+9172563788';
      var MyArray = myString.slice(4, 10)
      localStorage.removeItem('checkout')
     // this.cartList = this.cartItems.getCart()
     let language:any = localStorage.getItem('languageName')
     this.languageShow = JSON.parse(language)
     this.isLoading=true
     this.cartItems.getsidraCart().subscribe((data:any)=>{ 
       this.cartDataMain=data.data?.results
       this.isLoading = false;
       this.freeShipNote=data?.note
       let user:any = localStorage.getItem("marketplaceUser")
       let userData = JSON.parse(user)
       this.finalprice = this.cartDataMain.reduce(function(prev:any, cur:any) {
         return prev + cur.total_price;
       }, 0);
     })   
     this.msg.getRefreshData().subscribe((d:any)=>{
       this.cartItems.getsidraCart().subscribe((data:any)=>{
         this.cartDataMain=data.data?.results
         this.finalprice = this.cartDataMain.reduce(function(prev:any, cur:any) {
           return prev + cur.total_price;
         }, 0); 
       })  
     }) 
     this.auth.getAddressList().subscribe((data:any)=>{
       this.addressList=data.data?.results
     }) 
     this.isSaveForLatertrue=true
    }
    else{
      this.isSaveForLatertrue=false
      let history:any =  localStorage.getItem('cartData')
      this.cartDataMain = JSON.parse(history)
      if(this.cartDataMain!=null){
        this.finalprice = this.cartDataMain.reduce(function(prev:any, cur:any) {
          return prev + cur.total_price;
        }, 0);
      }
      this.msg.getPriceUpdate().subscribe((d:any)=>{
        this.finalprice=d 
      })
    }
  }  

  ngAfterViewInit(){
    // window.scroll(0,0)
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

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 800); 
  }
  

  
  constructor(private _order:OrderService,
    private router:Router,private messenger:MessengerService,
    private auth:AuthService,
    private wishListData:WishlistService,
    private _productService: ProductService, 
    private msg:MessengerService,
    private cartItems: CartService, 
    private toaster: ToastrService) {
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    this.userDetail = JSON.parse(user)
    if(userData != null){
      this.auth.getUserAddress().subscribe((data:any)=>{
        let is_default=data.data.customer_user_data.filter((data:any)=>data.is_default==true)
        if(data.data.customer_user_data.length == 0){
          this.isAddress = false
        }else{
          this.isAddress = true
          if(data.data.customer_user_data.length <= 1){
            this.billingAddress = data.data.customer_user_data[0]
            this.shippingAddress = data.data.customer_user_data[0]
          }else{ 
            if(is_default.length >0){
              this.billingAddress = is_default[0]
              this.shippingAddress = is_default[0]
            }else{
              this.billingAddress = data.data.customer_user_data[0]
              this.shippingAddress = data.data.customer_user_data[0]
            }
          }
          this.userDetailAdress = data.data.customer_user_data
        }
      })
    }
  }

  addressSendotp(){
    // if(this.addAdress.value.mobile==''||this.addAdress.value.street==''||this.addAdress.value.city==''||this.addAdress.value.buildingname==''||this.addAdress.value.pincode==''||this.addAdress.value.buildingNo==''||this.addAdress.value.area==''||this.addAdress.value.state=='')return
    let otpVarify={
      contact:'+971' +this.contact
    }                 
    this.auth.addresOtpSend(otpVarify)  
    this.msg.getOtpValidateMessage().subscribe((data:any)=>{
      if(data=='success'){
        this.cartpageDisplay=true
        this.observableTimer()        
      }             
    })              
  }

  navigateProductPage(id:any){
    this.router.navigate(['/product/' + id])
  } 

  resendOtpNew(){
    let otpVarify={
      contact:'+971' +this.contact
    }
    this.auth.addresOtpSend(otpVarify)  
    this.observableTimer()
   
  }

  removeFromCart(e:any,i:any){
    this.cartDataMain.splice(i,1)
    let dataKey="cartData"
    localStorage.setItem(dataKey,JSON.stringify(this.cartDataMain))
 } 

  createAddress(){
    let varify={
      contact:'+971' +this.contact,
      otp:parseInt(this.addressCreateOtp)
    }
    this.auth.addresOtpVarify(varify)
    this.msg.getOtpSuccsess().subscribe((data:any)=>{
      if(data=="success"){
        let user: any = localStorage.getItem('marketplaceUser');
        let userProfile = JSON.parse(user)
        let addressDataAdd = {
          street_name: this.street,
          building_no: this.buildingno,
          user_code: userProfile.customer_usercode, 
          full_name: this.address,
          building_name: this.buildingname,
          city: this.city, 
          landmark: this.landmark,
          contact: '+971'+this.contact,
          is_default: true,
          is_active: true,
          address_type: null,
          country: this.country,
          state: this.state
        }
        this.auth.createAddress(addressDataAdd)
        this.msg.getOtpValidateMessage().subscribe((data:any)=>{
          if(data=='success'){
            this.cartpageDisplay=false
            this.addNew = true
            this.isEditAddress=false
            this.street=""
            this.buildingno=""
            this.address=""
            this.buildingname=""
            this.city=""
            this.landmark=""
            this.contact=""
            this.state=""
          }
        })
      }
    })
  }
  
  changeNumberChangeBtn(){
    this.changeNumber=true
  }

  addWishList(id:any) {
    this.wishListData.addToWishList(id)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }  

  addCart(prod:any) {
    alert('addCart')
  }

  removeCart(e: any) {
    this.cartItems.removeCart(e)
    // setTimeout(() => {
    //   window.location.reload()
    // }, 2000);
  }

  removeWish(id:any) {
    this.wishListData.addToWishList(id)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  remove() {
    // alert('removed')
  }

  checkout(cartData:any){
    this.loader = true
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData ==null) {
      this.router.navigate(['/auth'])
    }
    
    let orderLineData:any = []
    this.cartList.filter((data:any)=>{
      let orderline:any = {
        cart_id: data.id,  
        variant_id: data.variant_id,  
        total_quantity: data.quantity, 
        branch_id: null,  
        amount: data.total_price,  
        is_active: true, 
        inventory_id:data.inventory_id 
      }
      orderLineData.push(orderline)
      orderline = {}
    })
    let order ={
      orderlines: orderLineData,
      user_id: userData.customer_usercode,
      delivery_mode: "not selected",
      is_single_delivery: false,
      delivery_date: null,
      delivery_address_id: this.shippingAddress.id,
      billing_address_id: this.billingAddress.id
    }
    this._order.orderSubmit(order)
    this.cartItems.addCheckout(this.cartArray)
    setTimeout(() => {
      this.loader = false
    }, 8000);
  }

  isWishlisted(id:any){
    return false
  }

  showAvailableAddress(){
    this.addNew = false
    this.isEditAddress=false
    this.auth.getUserAddress().subscribe((data:any)=>{
      let is_default=data.data.customer_user_data.filter((data:any)=>data.is_default==true)
      if(data.data.customer_user_data.length == 0){
        this.isAddress = false
      }else{
        this.isAddress = true
        if(data.data.customer_user_data.length <= 1){
          this.billingAddress = data.data.customer_user_data[0]
          this.shippingAddress = data.data.customer_user_data[0]
        }else{
          if(is_default.length >0){
            this.billingAddress = is_default[0]
            this.shippingAddress = is_default[0]
          }else{
            this.billingAddress = data.data.customer_user_data[0]
            this.shippingAddress = data.data.customer_user_data[0]
          }
        }
        this.userDetailAdress = data.data.customer_user_data
      }
    })
  }

  updateSendotp(){
    let otpVarify = {
      contact:'+971'+this.contactMobile
    }
    this.auth.addresOtpSend(otpVarify)  
    this.msg.getOtpValidateMessage().subscribe((data:any)=>{
      if(data=='success'){
        this.updateAddressOtp=true
        this.observableTimer()
      }
    })
  }

  resendUpdateOtpNew(){
    let otpVarify={
      contact:'+971'+this.mobile
    }
    this.auth.addresOtpSend(otpVarify)  
    this.observableTimer()
  }


  UpdateAddressWithOtp(id:any){
    let varify={
      contact:'+971'+this.contactMobile,
      otp:parseInt(this.addressUpdateOtp)
    }
    this.auth.addresOtpVarify(varify)
    this.msg.getOtpSuccsess().subscribe((data:any)=>{
      if(data=="success"){
        let user: any = localStorage.getItem('marketplaceUser');
        let userProfile = JSON.parse(user)
        let code = "+971"
        let addresss = {}
        addresss = {
          id : id,
          user_code : userProfile.customer_usercode,
          street_name: this.edit_address.street_name,
          building_no: this.edit_address.building_no,
          full_name : this.edit_address.full_name,
          building_name : this.edit_address.building_name,
          country : this.edit_address.country,
          state : this.edit_address.state,
          city : this.edit_address.city,
          landmark : this.edit_address.landmark,
          contact : '+971'+this.contactMobile,
          is_active : true,
          address_type : null,
        }
        this.auth.updateUserAddress(addresss,id)
        this.msg.getOtpValidateMessage().subscribe((data:any)=>{
          if(data=='success'){
            this.updateAddressOtp=false
            this.addAdress.reset()
            setTimeout(() => {
              window.location.reload()
            }, 300);
          }
        })
      }
    })
   
    // setTimeout(() => {
    //   window.location.reload()
    // }, 500);
  }

  updateAddress(id:any){
    let user: any = localStorage.getItem('marketplaceUser');
    let userProfile = JSON.parse(user)
    let code = "+971"
    let addresss = {}
    addresss = {
      id : id,
      user_code : userProfile.customer_usercode,
      street_name: this.edit_address.street_name,
      building_no: this.edit_address.building_no,
      full_name : this.edit_address.full_name,
      building_name : this.edit_address.building_name,
      country : this.edit_address.country,
      state : this.edit_address.state,
      city : this.edit_address.city,
      landmark : this.edit_address.landmark,
      contact : '+971'+this.contactMobile,
      is_active : true,
      address_type : null,
    }
    this.auth.updateUserAddress(addresss,id)
  }


  chooseCurrentLocationNew(){
    let current_address:any = localStorage.getItem('current-location')
    current_address = JSON.parse(current_address)
    if(current_address!=null){
      this.city = current_address.results[0].components.city
    }
    let user: any = localStorage.getItem('marketplaceUser');
    let userProfile = JSON.parse(user)
    if(userProfile !=null){
      this.auth.getUserProfile().subscribe((data:any)=>{
        this.address = data.data.fname + ' ' + data.data.lname
        this.contact = data.data.alternative_mobile_no
      })
    }
  }

  chooseCurrentLocationEdit(){
    let current_address:any = localStorage.getItem('current-location')
    current_address = JSON.parse(current_address)
    if(current_address!=null){
      this.edit_address.city = current_address.results[0].components.city
    }
    let user: any = localStorage.getItem('marketplaceUser');
    let userProfile = JSON.parse(user)
    if(userProfile !=null){
      this.auth.getUserProfile().subscribe((data:any)=>{
        this.edit_address.full_name  = data.data.fname + ' ' + data.data.lname
        this.edit_address.contact = data.data.alternative_mobile_no
      })
    }
  }

  selectShippingAddress(address:any){
    this.shippingAddress = address
  }

  selectBillingAddress(address:any){
    this.shippingAddress = address
  }

  editAddress(address:any){
    this.isEditAddress = true
    this.edit_address = address
     var number = this.edit_address?.contact.slice(4); 
    this.contactMobile = Number(number)
  }

  selectAddress(is_default:any,i:any){
    if(is_default){
      return i
    }else{
      return 0
    }
  }

  observableTimer() {
    const source = timer(1000,1000);
    const abc = source.subscribe(val => {
      if(val > this.timeLeft) return 
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  proceedToBuy(){
    if(this.userDetail!=null){
      let finalAddress:any
      if(this.addressList.length!=0){
        finalAddress=this.addressList.filter((d:any)=>d.is_default==false)
      }else{
        this.cartItems.getDefaultAddress().subscribe((d:any)=>{
          finalAddress=d.data?.value
        }) 
      } 
      let orderlinesArray:any=[]
      for(let i of this.cartDataMain){
        let orderlines:any={
          cart_id:i.id ,
          variant_id:i.variant_id,
          total_quantity:i.quantity,
          branch_id:i.branch_code,
          amount:i.price,
          is_active:i.is_active,
          inventory_id:i.inventory_id, 
          delivery_id:i.delivery_address_id,
          delivery_slot:i.delivery_slot.id
        }
        orderlinesArray.push(orderlines)
      }
       let order={
        orderlines:orderlinesArray ,
        delivery_mode:null,
        delivery_address_id:finalAddress[0]?.id,
        billing_address_id:finalAddress[0]?.id
      } 
      this.cartItems.OrderCreate(order)
      this.is_loading_orderCreate=true
      this.msg.getStatus().subscribe((d:any)=>{
        if(d=='success'){
            this.is_loading_orderCreate=false
        }else{
            this.is_loading_orderCreate=false
        }
      })
      localStorage.removeItem("confirmdelivery");
      localStorage.removeItem("confirmoption");
      localStorage.removeItem('cardsave')
      localStorage.removeItem('cashOndelivery')
      let cartData='isCheckoutActive'
      localStorage.setItem('checkout',cartData)
    }else{
      this.router.navigate(['auth'])
    }
  }

  cart(){
    this.isCart=true
    this.isInstantCart=false
    this.cartHeadingActive=true 
    this.InstantcartHeadingActive=false
  }

  Instantcart(){
    this.isCart=false
    this.isInstantCart=true
    this.cartHeadingActive=false
    this.InstantcartHeadingActive=true
  } 

}
