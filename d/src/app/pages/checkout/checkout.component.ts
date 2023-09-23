import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { OrderService } from 'src/app/services/order.service';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { DealsService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  savedCard: any = []
  cartDataMain: any = []
  cartDataMain2:any=[]
  totalAmount: any
  delveryAddressdetail = false
  deliveryAddressApproved = false
  cardSelctedIndex: any
  cardOption: any
  orderDataFull: any
  orderData: any
  checkConfirmDelivery = ""
  deliveryData: any
  paymentOption = false
  debitChecked = true
  savedCardShow = false
  deliveryOptionConfirmed = false
  confirmDeliveryOption = ""
  isGiftedClose=false
  giftarray:any=[]
  giftCardSelection:any=[]
  finalConfirmationOption:any
  finalPayementData=false
  cashOndeliveryTrue=false
  saveCardShow=false
  cashOn=false
  applyCouponisActive=false
  isPackingActive=false
  order_lines:any=[]
  giftCardMouseOver:any
  ToWhom:any
  FromWhom:any
  YourMessage:any
  wrapOptionArray:any=[]
  wrapOptionSingle:any
  selectedItemArray:any=[]
  giftLIst:any=[]
  isGiftEdit=false
  IsmodelShow=false
  defultWrapArray:any=[]
  defultWrapArrayCopy:any=[]
  userDetail:any
  couponDisplayArray:any=[]
  coupon_description:any
  indexOfCoupon:any
  copied=false
  indexOfCopied=0
  copyData:any=[] 
  is_btn_First_confrim=false
  is_btn_second_confrim=false
  payOnDelivey=false
  paymentOptionName:any
  orderDetails:any
  orderDataDetail:any
  idArray:any=[]
  productRoute= {name:String};
  IsDirectActive=false
  IsImageOfDirect:any
  addressList:any=[]
  defaultData:any=[] 
  walletData:any={}
  is_wallet_active=false
  checkData=""
  checkData1:any
  cardId:any
  gift_prod_index:any 
  gift_prod_array:any=[]
  gift_option_data:any=[]
  couponRemove_active=false
  couponID:any
  indexGiftArray:any=[]
  wrapIndex=0
  wrapOptionData:any
  wrapSelectIndex:any
  directcard_selection:any
  conditionOfGift=""
  addressArray:any=[]
  spliceIndex=null
  orderDetail:any
  indexGiftData:any
  giftOptionSend:any
  orderDetailsAll:any
  isLoading=false
  btn_payment_enable=false
  giftOptionConfirmed=false
  constructor(private cart: CartService,
              private order: OrderService,
              private msg: MessengerService,
              private copyText:ClipboardService,
              private route: ActivatedRoute,
              private seller:SellerService,
              private auth:AuthService,
              private deals:DealsService) {} 

  ngAfterViewInit() {
    // window.scroll(0, 0)
  }
  

  ngOnInit(): void {
    let order: any = localStorage.getItem('orderData')
    let orderDetails = JSON.parse(order)
    let user:any = localStorage.getItem("marketplaceUser")
    this.userDetail = JSON.parse(user) 
    this.loadData() 
    this.totalAmount = orderDetails.total_amount 
    this.productRoute = {
      name: this.route.snapshot.params['name'],
    } 
    this.checkData1=this.productRoute.name
    this.cart.getsidraCart().subscribe((data: any) => {
        this.cartDataMain = data.data?.results
        let cartItemList:any=[]
        for(let i of this.cartDataMain){
          let giftOption={
            variant_id:i.variant_id,
            quantity:i.quantity
          }
          cartItemList.push(giftOption)
        } 
        this.giftOptionSend={
          is_gift_packing:false,
          variant_data:cartItemList
        } 
        this.cart.getGiftData(this.giftOptionSend)
        this.msg.getOrderResponse().subscribe((d:any)=>{
          this.defultWrapArray=d 
          this.defultWrapArrayCopy=d
          if(this.defultWrapArray.length==1&&this.defultWrapArray[0]?.price==0){
              this.isPackingActive=false
          } 
        }) 
        let orderData1:any = localStorage.getItem("orderProductDetail")
        this.orderDataDetail = JSON.parse(orderData1)
        if(this.checkData1!="direct"){
          this.IsDirectActive=false
          for(let i of this.orderDataDetail?.orderlines){
            let x:any={
              id:i.variant_id
            }
            this.idArray.push(x) 
          }
          for(let j of this.idArray){ 
            let data1:any=this.cartDataMain.filter((d:any)=>d.variant_id==j.id)
            let data2=data1[0]
            this.cartDataMain2.push(data2) 
            this.cartDataMain2 = this.cartDataMain2.filter((item:any, index:any) => {
              return this.cartDataMain2.indexOf(item) === index;
            });
          } 
        }else{
          this.IsDirectActive=true
          this.cartDataMain2.push(this.orderDataDetail?.order_meta)
        } 
    }) 
    this.order.ListCard().subscribe((data: any) => {
      this.savedCard = data.data.results
      console.log(this.savedCard,"*********$$$$$$$$$$$$$$$@@@@@@@@@@");
      if(this.savedCard.length!=0){
        this.cardSelctedIndex=0
        this.finalConfirmationOption=this.savedCard[0]
        this.cardId=this.savedCard[0]?.id
      }
    }) 
    this.orderData = localStorage.getItem('orderData')
    this.orderDataFull = JSON.parse(this.orderData);
    this.cart.getGiftedProduct(this.orderDataFull.id).subscribe((data:any)=>{
      this.giftLIst=data.data?.gift_option
      // this.giftLIst = Object.values(this.giftLIst.reduce((groups:any, item:any) => {
      //   const { groupId } = item.group_id;
      //   if (!groups[groupId]) {
      //     groups[groupId] = [];
      //   } 
      //   groups[groupId].push(item);
      //   return groups;
      // }, {}));
    }) 
    this.msg.getRefreshData().subscribe((d:any)=>{
      this.cart.getGiftedProduct(this.orderDataFull.id).subscribe((data:any)=>{
        this.giftLIst=data.data?.gift_option
      }) 
    }) 
    this.delveryAddressdetail=true
    this.finalPayementData=false 
    this.paymentOption=false
    // this.deliveryData = localStorage.getItem('confirmdelivery')
    // if (this.deliveryData == "confirm") {
    //   this.delveryAddressdetail = false 
    //   this.deliveryAddressApproved = true
    //   this.savedCardShow=true 
    //   this.paymentOption=true 
    //   this.finalPayementData=false
    //   this.is_btn_First_confrim=true
    //   this.is_wallet_active=false
    // } 
    // let confirmdeliveyOption = localStorage.getItem('confirmoption')
    // if (confirmdeliveyOption == "confirmoption") {
    //   this.deliveryOptionConfirmed = true 
    //   this.paymentOption = false
    //   this.is_wallet_active=false
    // } 
    // let cardsaveData:any=localStorage.getItem('cardsave')
    // this.finalConfirmationOption=JSON.parse(cardsaveData);
    // if(this.finalConfirmationOption!=null){
    //   this.savedCardShow = false 
    //   this.cashOn=false 
    //   this.finalPayementData=true 
    //   this.is_btn_second_confrim=true 
    //   this.is_wallet_active=false 
    // } else{ 
    //   this.deliveryOptionConfirmed=false 
    // }  
    // let cash=localStorage.getItem('cashOndelivery')
    // console.log(this.finalConfirmationOption,cash,"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    
    // if(cash=='cashOn'&&cash!=null){
    //    this.cashOndeliveryTrue=false 
    //    this.finalPayementData=false 
    //    this.cashOn=true 
    //    this.paymentOption=false
    //    this.deliveryOptionConfirmed=true
    //    this.is_btn_second_confrim=true
    //    this.is_wallet_active=false
    // } 
    // if(cash!=null&&this.finalConfirmationOption==null){
    //     this.paymentOption=true
    // } 
    // this.msg.processComplete().subscribe((d:any)=>{
    //    this.orderDetails=d
    //    console.log(orderDetails.total_amount,"%$%%%$%$%%$%$%$%$%$%$%%$%$%%$%$%$%$%$%$%$%");
    // })

    this.deals.getWallet().subscribe((d:any)=>{
      this.walletData=d.data
      // if(Object.keys(this.walletData).length === 0){
      //   this.is_wallet_active=false
      // }else{
      //   this.is_wallet_active=true
      // }
    })

 
    this.cart.getGiftProduct(this.orderDataFull.id).subscribe((data:any)=>{
      this.order_lines=data?.data?.order_lines
      // this.totalAmount=data.data?.totalAmount
      this.orderDetailsAll=data.data
    }) 

    let varientList:any=[]
    for(let i of this.cartDataMain){
      varientList.push(i.variant_id)
    } 
     let data={
      customer_code:this.userDetail?.customer_usercode,
      variant_id_list:varientList
     } 
     this.cart.couponForsingle(data)
     this.msg.getcoupon().subscribe((d:any)=>{
        this.couponDisplayArray=d?.data?.results
     }) 
     this.auth.getAddressList().subscribe((data:any)=>{
      this.addressArray=data.data?.results
    }) 

  }


  removeDuplicates(array: any[], field: string): any[] {
    return array.filter((value:any, index:any, self:any) => {
      return index === self.findIndex((obj:any) => obj[field] === value[field]);
    });
  }

  paymentOptionselection() {
    this.paymentOption = true
  }

  walletcreation(e:any) {
    if(e.target.checked!=false){
      if(this.walletData?.balance>=this.totalAmount){
        this.paymentOptionName="wallet"
        this.paymentOption=false
        this.finalPayementData=false
        this.cashOn=false
        this.is_btn_First_confrim=true
        this.is_btn_second_confrim=true
        this.checkData="efficient"
      }else{
        this.paymentOption=true
        this.finalPayementData=false
        this.cashOn=false
        this.checkData="inefficient"
        this.paymentOptionName="wallet_with_cash"
        this.is_btn_First_confrim=false
        this.is_btn_second_confrim=false
      }
    }else{
      this.paymentOptionName=null
      this.paymentOption=true
      this.finalPayementData=false
      this.cashOn=false
      this.is_btn_First_confrim=false
      this.is_btn_second_confrim=false
      this.checkData="unchecked"
    }
  }
  
  selectIndex(i:any){
    this.indexGiftData=i
  }

  showAddressDetail() {
    this.delveryAddressdetail = true
    this.deliveryAddressApproved = false
  }

  confirmDelivery() {
    this.delveryAddressdetail = false
    this.deliveryAddressApproved = true
    this.paymentOption = true
    this.checkConfirmDelivery = "confirm"
    this.is_btn_First_confrim=true
    this.savedCardShow=true
    localStorage.setItem('confirmdelivery', this.checkConfirmDelivery)
  }

  cardSelected(i: any,item:any) {
    this.cardSelctedIndex = i 
    this.finalConfirmationOption=item
    this.giftCardSelection.push(item)
    this.paymentOptionName="card"
    this.cardId=item.id
  }

  viewDetail() {
    this.deliveryAddressApproved = false
    this.delveryAddressdetail = true
    this.checkConfirmDelivery = ""
    this.is_btn_First_confrim=false
    localStorage.setItem('confirmdelivery', this.checkConfirmDelivery)
    this.finalPayementData=false
    this.cashOn=false
    this.deliveryOptionConfirmed=false
    localStorage.removeItem('cardsave')
  } 

  proceedToBuy() {
    this.cashOndeliveryTrue=true
    this.debitChecked=false
    this.payOnDelivey=true
    this.savedCardShow=false
    this.btn_payment_enable=true
  } 

  paymentWithCard() {
    let amount = {
      currencyCode: "AED",
      value: this.orderDataFull?.total_amount
    }
    let payment = {
      user: this.orderDataFull.user_id,
      order: this.orderDataFull.id,
      action: "SALE",
      redirect_url: "https://sidrabazar.com/#/order-success/",
      amount: amount
    }
    this.order.cardsave(payment)
    
  }

  debitCard() {
    this.debitChecked = !this.debitChecked
    this.savedCardShow = !this.savedCardShow 
    this.payOnDelivey=false
    this.cashOndeliveryTrue=false
    this.is_btn_First_confrim=false
    this.is_btn_second_confrim=false
  } 

  confirmeddeliveryOption() {
    this.deliveryOptionConfirmed = false
  }


  confirDeliOption() {
    this.deliveryOptionConfirmed = true
    this.paymentOption = false
    this.savedCardShow = false
    this.confirmDeliveryOption = "confirmoption"
    localStorage.setItem('confirmoption', this.confirmDeliveryOption)
    localStorage.setItem('cardsave', JSON.stringify(this.finalConfirmationOption))
    if(this.cardSelctedIndex==0){
      this.finalConfirmationOption=this.savedCard[0]
    }
    this.finalPayementData=true
    this.saveCardShow=true 
    this.cashOn=false 
    this.is_btn_second_confrim=true
    this.is_btn_First_confrim=true
    // if(this.checkData) 
    if(this.finalConfirmationOption!=''){
      this.paymentOptionName="card"
    }
    if(this.checkData=="inefficient"){
      this.paymentOptionName="is_wallet_active_card"
    } 
    this.is_wallet_active=false
    this.deliveryOptionConfirmed=true
  } 

  confirmCashOnDelivery(){ 
    this.finalPayementData=true
  }

  checkWarp(e:any,item:any,i:any){
    this.wrapOptionSingle=item
    this.wrapSelectIndex=i
  }

  confirmGiftOption(){
    this.isGiftedClose=true
    let name={
      name:"GIFT OPTION 1"
    }
    let giftPost:any=[]
    for(let i of this.selectedItemArray){
      let Gift={
        line_id:i.id,
        to_name:this.ToWhom,
        from_name:this.FromWhom,
        message:this.YourMessage,
        type: "gift option",
        type_id:this.wrapOptionSingle?.id,
        type_amount:this.wrapOptionSingle?.price
      }
      giftPost.push(Gift)
    }  
    
    let gift={
      type: "gift option",    
      type_id: this.wrapOptionSingle?.id,    
      type_amount: this.wrapOptionSingle?.price,    
      line_values: giftPost 
    }

    this.cart.giftOptioneApply(this.orderDataFull.id,gift)
    
    this.msg.get().subscribe((d:any)=>{
      if(d.status=="success"){
         for(let j of this.indexGiftArray){
            let index=this.order_lines.findIndex((d:any)=>d.name==j.name)
            this.order_lines.splice(index,1)
         }
         this.selectedItemArray=[]
        this.cart.getGiftProduct(this.orderDataFull.id).subscribe((data:any)=>{
          this.totalAmount=data.data?.total_amount
        }) 
        // this.giftLIst=d.data?.order_meta?.gift option
        this.IsmodelShow=true
        this.cart.getGiftedProduct(this.orderDataFull.id).subscribe((data:any)=>{
          // this.totalAmount=data.data?.total_amount
          this.giftLIst=data.data?.gift_option
          // for(let j of demo){
          //   let demo2=j.values
          //   this.giftLIst=j.values
          //   console.log(this.giftLIst,"**&*&*^&^%&^%^%$^%@#%#$%!#!#^%!#^@%^@#^%!^%#@^%#%@");
          // } 
        }) 
      }
    })
    this.giftarray.push(name)
    this.IsmodelShow=true
  } 

  editGiftConfirmation(){
    this.isGiftedClose=true
    let giftPost:any=[]
    for(let i of this.giftLIst){
      let Gift={
        line_id:i.line_id,
        to_name:this.ToWhom,
        from_name:this.FromWhom,
        message:this.YourMessage,
        type: "gift option",
        type_id:i?.type_id,
        type_amount:i?.type_amount
      }
      giftPost.push(Gift)
    } 
    let gift={
      type: "gift option",    
      type_id: this.giftLIst[0]?.id,    
      type_amount:this.giftLIst[0]?.type_amount,    
      line_values: giftPost 
    }
    this.cart.giftOptioneApply(this.orderDataFull.id,gift)
    this.giftarray.push(name)
  } 

  deleteGift(id:any){
    let data={
      line_type:"gift option",
      group_id:id
    }
    this.cart.deleteGiftCard(this.orderDataFull.id,data)
    // this.defultWrapArray=this.defultWrapArrayCopy  
    this.cart.getGiftProduct(this.orderDataFull.id).subscribe((data:any)=>{
      this.order_lines=data?.data?.order_lines
      this.totalAmount=data.data?.total_amount
    }) 
    // if(this.giftLIst.length==0){
    //   this.cart.getGiftData(this.giftOptionSend)
    //   this.msg.getOrderResponse().subscribe((d:any)=>{
    //     this.defultWrapArray=d 
    //     this.defultWrapArrayCopy=d
    //     if(this.defultWrapArray.length==1&&this.defultWrapArray[0]?.price==0){
    //         this.isPackingActive=false
    //     }
    //   }) 
    // }
  } 


  editGiftList(item:any){
    this.order_lines=this.giftLIst 
    this.ToWhom=this.giftLIst[0].to_name
    this.FromWhom=this.giftLIst[0].from_name
    this.YourMessage=this.giftLIst[0].message
    this.isGiftEdit=true
  }

  clickGiftOption(){
    this.isGiftedClose=true
    this.paymentOption=false
  }

  skipAndContinue(item:any){
    let confirmdeliveyOption = localStorage.getItem('confirmoption')
    if(item=="gift"){
      this.isGiftedClose=false
      this.paymentOption=true
    }else if(item=="packing"){
      this.isPackingActive=false
      this.paymentOption=true 
    }
  }

  saveAndCotinue(){
    this.isGiftedClose=false
    this.paymentOption=true
    this.giftOptionConfirmed=true
  }

  cartUpdate(){
      let packing={
        type:"package option",
        type_id:this.wrapOptionData.id,
        type_amount:this.wrapOptionData.price
      }
      this.cart.giftOptioneApply(this.orderDataFull.id,packing)
      this.isPackingActive=false
      this.paymentOption=true 
      this.msg.get().subscribe((d:any)=>{
        if(d.status=="success"){
          this.cart.getGiftProduct(this.orderDataFull.id).subscribe((data:any)=>{
            // this.order_lines=data?.data?.order_lines
            this.totalAmount=data.data?.total_amount
          }) 
          // this.giftLIst=d.data?.order_meta?.gift option
          this.IsmodelShow=true
        }
      })
      
  }



  changeToBack(){
    this.finalPayementData=false
    this.paymentOption=true
    this.savedCardShow = true 
    this.cashOn=false
    this.finalPayementData=false 
    localStorage.removeItem("cashOndelivery");
    this.finalConfirmationOption=""
    this.payOnDelivey=false 
    this.debitChecked=true
    this.is_btn_second_confrim=false 
    this.deliveryOptionConfirmed=false
    localStorage.removeItem('cardsave')
    this.cardSelctedIndex=0
    this.directcard_selection=''
    this.btn_payment_enable=false
  }

  cashOnChange(){
    this.saveCardShow=false
    this.cashOn=true
    this.finalPayementData=false
    this.paymentOption=false
    this.cashOndeliveryTrue=false
    let data='cashOn'
    localStorage.setItem('cashOndelivery',data )
    this.is_btn_second_confrim=true
    localStorage.removeItem('cardsave')
    this.finalConfirmationOption=""
    this.finalPayementData=false
    this.paymentOptionName="cashOn"
    this.is_wallet_active=false
    if(this.checkData=="inefficient"){
      this.paymentOptionName="is_wallet_active_not"
    }
    this.deliveryOptionConfirmed=true
  }
  
  applyCoupon(){
    this.applyCouponisActive=!this.applyCouponisActive 
  }

  packingData(){
    if(this.defultWrapArray.length==1&&this.defultWrapArray[0]?.price==0)return
    this.isPackingActive=true
    this.paymentOption=false
  } 

  addingGiftOption(){
    this.IsmodelShow=false
    this.ToWhom=""
    this.FromWhom=""
    this.YourMessage=""
  }

  mouseOverGift(i:any){
    this.giftCardMouseOver=i
  }


  giftInput(e:any,item:any,i:any,selected:any){
    if(selected==true){
      let cartItemList:any=[]
      let giftOption={
        variant_id:item.variant,
        quantity:item.total_quantity
      }  
      cartItemList.push(giftOption)
      let gift={
        is_gift_packing:true,
        variant_data:cartItemList
      } 
      this.cart.getGiftData(gift)
      this.msg.getOrderResponse().subscribe((d:any)=>{
        this.wrapOptionArray=d
      }) 
      this.selectedItemArray.push(item)
    } 
  } 

  couponShow(){
    this.copied=false
    let varientList:any=[]
    for(let i of this.cartDataMain){
      varientList.push(i.variant_id)
    } 
     let data={
      customer_code:this.userDetail?.customer_usercode,
      variant_id_list:varientList
     } 
     this.cart.couponForsingle(data)
     this.msg.getcoupon().subscribe((d:any)=>{
        this.couponDisplayArray=d?.data?.results
     }) 
  }     

  showCouponDes(des:any,i:any){
    this.coupon_description=des
    this.indexOfCoupon=i 
  } 

  copyTextCode(code:any,i:any,item:any) { 
    this.copyText.copyFromContent(code)
    this.copied=true
    this.indexOfCopied=i
    this.copyData=item
  }  
   
  couponAppy(){
    let quantity:any=this.cartDataMain.reduce(function(quan:any, d:any) {
      return quan + d.quantity;
    }, 0);
    let variantList:any=[]
    for(let i of this.cartDataMain){
     let product={
      variant_id:i.variant_id, 
      total_quantity:i.quantity, 
      total_amount:i.price
     }
     variantList.push(product)
    }
    let coupon={
      coupon_id:this.copyData.id,   
      total_amount:this.orderDataFull.total_amount,   
      total_quantity:quantity,   
      is_another_coupon_applied:false,   
      customer_code:this.userDetail?.customer_usercode, 
      temp_code:this.copyData.temp_code, 
      variant_list:variantList,
    }
    this.cart.couponApply(coupon)
    this.msg.getOrderResponse().subscribe((d:any)=>{
      this.couponRemove_active=true
    })
  }


  deleteCoupon(){
    let coupon={
      coupon_id:this.copyData.id,   
      customer_code:this.userDetail?.customer_usercode, 
    }
    this.cart.deleteCoupon(coupon)
    this.msg.getOrderResponse().subscribe((d:any)=>{
      if(d.ststus="success"){
          this.couponRemove_active=true
      }
    })
  }

  payonDelivey(){
    this.payOnDelivey=true
    this.debitChecked=false
    this.paymentOption=false
    this.savedCardShow=false
    this.finalPayementData=true
  }


  FinalProceedToBuy(){
    localStorage.setItem('afterorderProduct',JSON.stringify(this.orderDataFull.id))
      let orderId:any = localStorage.getItem("afterorderProduct")
      let orderIdFind = JSON.parse(orderId)
    if(this.paymentOptionName=='card'){
      let amount = {
        currencyCode: "AED",
        value: this.orderDataFull?.total_amount
      }
      let payment = {
        user: this.orderDataFull.user_id,
        order: this.orderDataFull.id,
        action: "SALE",
        redirect_url: "https://sidrabazar.com/#/order-success/",
        amount: amount,
        card_profile:this.cardId
      }
      this.order.cardsave(payment)
    }
    if(this.paymentOptionName=='directcard'){
      let amount = {
        currencyCode: "AED",
        value: this.orderDataFull?.total_amount
      }
      let payment = {
        user: this.orderDataFull.user_id,
        order: this.orderDataFull.id,
        action: "SALE",
        redirect_url: "https://sidrabazar.com/#/order-success/",
        amount: amount,
        card_profile:""
      }
      this.order.cardsave(payment)
    }
    if(this.paymentOptionName=='cashOn'){
      let amount = {
        currencyCode: "AED",
        value: this.orderDataFull?.total_amount
      }
      let billing = {
        billing_address_id: this.orderDataFull.billing_address_id
      }
      let cod = {
        user: this.orderDataFull.user_id,
        order: this.orderDataFull.id,
        action: "SALE",
        payment_info: amount,
        billing_info: billing
      }
      this.order.cashOnDelivey(cod,this.orderDataFull.id)
    }
    if(this.paymentOptionName=="wallet"){
      let order: any = localStorage.getItem('orderData')
      let orderDetails = JSON.parse(order)
      let d: any = {
        order_id: orderDetails.id,
        amount: this.totalAmount
      }
      this.order.walletCreation(d)
    }
    if(this.paymentOptionName=="is_wallet_active_card"){
      let amount = {
        currencyCode: "AED",
        value: this.orderDataFull?.total_amount
      }
      let combine_wallet={
        amount:this.walletData.balance
      }
      let payment = { 
        user: this.orderDataFull.user_id,
        order: this.orderDataFull.id,
        action: "SALE",
        redirect_url: "https://sidrabazar.com/#/order-success/",
        amount: amount,
        combine_wallet:combine_wallet,
        card_profile:this.cardId
      }
      this.order.cardsave(payment)
    }
    if(this.paymentOptionName=="is_wallet_active_cashon"){
    
      let combine_wallet={
        amount:this.walletData.balance
      } 
      let amount = {
        currencyCode: "AED",
        value: this.orderDataFull?.total_amount
      }
      let billing = {
        billing_address_id: this.orderDataFull.billing_address_id
      }
      let cod = {
        user: this.orderDataFull.user_id,
        order: this.orderDataFull.id,
        action: "SALE",
        payment_info: amount,
        billing_info: billing,
        combine_wallet:combine_wallet
      }
      this.order.cashOnDelivey(cod,this.orderDataFull.id)
    }
  }


  AddSavedCard(){
    // this.btn_payment_enable=true
    this.isLoading=true
    this.auth.getAddressList().subscribe((data:any)=>{
      this.addressList=data.data?.results
      this.defaultData=this.addressList.find((d:any)=>d.is_default==false)
      let card={
        building_name:this.defaultData.building_name,
        street_name:this.defaultData.street_name,
        city:this.defaultData.city,
        countryCode:this.defaultData.country,
        "cancel_url":"", 
        redirect_url:"http://127.0.0.1:4200/#/checkout/"+this.checkData1
      }
      this.seller.saveCard(card)
      this.msg.getStatus().subscribe((d:any)=>{
        if(d.status=='success'){
            this.isLoading=false
        }
      })
    }) 
  }

  directcard(){
    this.paymentOptionName="directcard"
    this.directcard_selection="directcard"
    this.cardSelctedIndex=null
    // this.finalPayementData=false
    this.finalConfirmationOption=""
    this.btn_payment_enable=true

  }


  giftOptionIndex(event:any,i:any,item:any,checkbox:any){
     this.gift_prod_index=this.indexGiftData
    let data={
      name:item.name
    }
    this.indexGiftArray.push(data)
    // console.log(this.order_lines);
     item.selected=!item.selected
     if(item.selected==true){
      let cartItemList:any=[]
      let giftOption={
        variant_id:item.variant,
        quantity:item.total_quantity
      }  
      // console.log(item); 
      cartItemList.push(giftOption)
      let gift={
        is_gift_packing:true,
        variant_data:cartItemList
      } 
      this.cart.getGiftData(gift) 
      this.msg.getOrderResponse().subscribe((d:any)=>{
        this.wrapOptionArray=d
      }) 
      this.selectedItemArray.push(item)
     }
  } 

  
  wrapIndexselect(i:any,item:any){
      this.wrapIndex=i
      this.wrapOptionData=item
  }


  wrapotopnSelect(i:any){
      this.wrapSelectIndex=i
  }

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 800); 
  }


}


