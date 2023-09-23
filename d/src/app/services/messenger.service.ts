import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from 'src/assets/database/brand1';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(private http: HttpClient) { }
  subject = new Subject()
  removeCart = new Subject()
  wishList = new Subject()
  loginAuth = new Subject()
  userProfile = new Subject()
  address = new Subject()
  segments = new Subject()
  orderResponse = new Subject()
  wrapOption=new Subject()
  searchValue = new Subject()
  forgotPass = new Subject()
  processProgress = new Subject()
  newPasswordFromReset = new Subject()
  addressMessage = new Subject()
  paymentFailed = new Subject()
  allFilter = new Subject()
  paymentStatus = new Subject()

  searchDataCategoryDivison = new Subject()
  reference_id = new Subject()
  cashOndelivery = new Subject()
  dontRefersh: any = new Subject()
  count = new Subject()
  price = new Subject()
  search = new Subject()
  mainId = new Subject()
  varientId = new Subject()
  ratingId = new Subject()
  btnAvailable = new Subject()
  coupons = new Subject()
  OtpValidate = new Subject()
  OtpVarifyMessage = new Subject()
  otpSuccsess = new Subject()
  addresUpdateOtp = new Subject()
  languageMsg = new Subject()
  convertValue: any
  popularCate = new Subject()
  withoutRefresh = new Subject()
  buttonEnableMessage = new Subject()
  otpAction = new Subject()
  datachecking = new Subject()
  waringMsg = new Subject()
  brandArray = new Subject()
  filterChecking = new Subject()
  coupon = new Subject()
  unwish = new Subject()
  popupclose = new Subject()
  addressmodalclose = new Subject()
  datachecking1 = new Subject
  datachecking2 = new Subject
  priceUpdate=new Subject
 

  
  sendPriceUpdate(d:any){
    this.priceUpdate.next(d)
  }

  getPriceUpdate(){
    return this.priceUpdate.asObservable()
  }
  
  sendWish(data: any) {
    this.unwish.next(data)
    console.log("dadadadaadatatatata",data);
  }
  resendOtp = new Subject
  getWish() {
    return this.unwish.asObservable()
  }


  send(data: any) {
    this.datachecking.next(data)
  }

  get() {
    return this.datachecking.asObservable()
  }


  send1(data: any) {
    this.datachecking1.next(data)
  }

  get1() {
    return this.datachecking1.asObservable()
  }

  send2(data: any) {
    this.datachecking2.next(data)
  }

  get2() {
    return this.datachecking2.asObservable()
  }

  sendcoupon(data: any) {
    this.coupon.next(data)
    console.log(data);
  }

  getcoupon() {
    return this.coupon.asObservable()
  }

  sendFilter(data: any) {
    this.filterChecking.next(data)
  }

  getFilter() {
    return this.filterChecking.asObservable()
  }

  sendBrand(data: any) {
    this.brandArray.next(data)
  }

  getBrand() {
    return this.brandArray.asObservable()
  }

  sendwaringMsg(data: any) {
    this.waringMsg.next(data)
  }

  getwaringMsg() {
    return this.waringMsg.asObservable()
  }


  sendOtp(data: any) {
    this.otpAction.next(data)
  }

  getOtp() {
    return this.otpAction.asObservable()
  }
  sendOtpForAddressResend(data: any) {
    this.resendOtp.next(data)
  }

  getOtpForAddressResend() {
    return this.resendOtp.asObservable()
  }

  sendWithoutRefresh() {
    this.withoutRefresh.next()
  }

  getWithoutRefresh() {
    return this.withoutRefresh.asObservable()
  }

  sendPopularCate(value: any) {
    this.popularCate.next(value)
  }

  getPopularCate() {
    return this.popularCate.asObservable()
  }

  sendLanguageServices(value: any) {
    let key = "AIzaSyCxTvoFIzYZPhK4AaqQSmo8o6-Ow2DRW5k"
    let modal = {
      "q": [value],
      "target": "ar"
    }
    return this.http.post("https://translation.googleapis.com/language/translate/v2?key=" + key, modal).toPromise().then((data: any) => {
      value = data.data.translations[0].translatedText
    })
  }

  getsendLanguageServices() {
    return this.languageMsg.asObservable()
  }

  sendUpdateAddress(data: any) {
    this.addresUpdateOtp.next()
  }

  getUpdateAddress() {
    return this.addresUpdateOtp.asObservable()
  }

  sendOtpSuccsess(data: any) {
    this.otpSuccsess.next(data)
  }

  getOtpSuccsess() {
    return this.otpSuccsess.asObservable()
  }

  sendOtpVaidate(data: any) {
    this.OtpVarifyMessage.next(data)
  }

  getOtpValidateMessage() {
    return this.OtpVarifyMessage.asObservable()
  }

  sendOtpValidate(data: any) {
    this.OtpValidate.next(data)
  }

  getOtpValidate() {
    return this.OtpValidate.asObservable()
  }

  sendCoupons(data: any) {
    this.coupons.next(data)
  }

  getCoupons() {
    return this.coupons.asObservable()
  }

  sendBtnAvailable(data: any) {
    this.btnAvailable.next(data)
  }

  getBtnAvailable() {
    return this.btnAvailable.asObservable()
  }

  idPassing(id: any) {
    this.mainId.next(id)
  }

  getId() {
    return this.mainId.asObservable()
  }

  ratingID(id: any) {
    this.ratingId.next(id)
  }

  getRatingId() {
    return this.ratingId.asObservable()
  }

  variantIdPassing(id: any) {
    this.varientId.next(id)
  }

  getVaientId() {
    return this.varientId.asObservable()
  }

  sendSearchWord(data: any) {
    this.search.next(data)
  }
  getSearchWord() {
    return this.search.asObservable()
  }
  sendSearchData(data: any) {
    this.searchDataCategoryDivison.next(data)
  }
  getSearchData() {
    return this.searchDataCategoryDivison.asObservable();
  }

  sendFailedData(data: any) {
    this.paymentFailed.next(data)
  }
  getFailedData() {
    return this.paymentFailed.asObservable();
  }

  sendAllFilter(data: any) {
    this.allFilter.next(data)
  }

  getAllFilter() {
    return this.allFilter.asObservable();
  }


  sendForgotOtpConfirm(email: any) {
    this.newPasswordFromReset.next(email)
  }
  getForgotOtpConfirm() {
    return this.newPasswordFromReset.asObservable();
  }

  sendForgot(email: any) {
    this.forgotPass.next(email)
  }

  getForgot() {
    return this.forgotPass.asObservable();
  }

  processStart(prod: any) {
    this.processProgress.next(prod)
  }
  processComplete() {
    return this.processProgress.asObservable();
  }

  sendsearchValue(prod: any) {
    this.searchValue.next(prod)
  }
  getsearchValue() {
    return this.searchValue.asObservable();
  }

  sendOrderResponse(prod: any) {
    this.orderResponse.next(prod)
  }
  getOrderResponse() {
    return this.orderResponse.asObservable();
  }

  sendWrapOption(prod: any) {
    this.wrapOption.next(prod)
  }
  getsendWrapOption() {
    return this.wrapOption.asObservable();
  }

  sendSegments(prod: any) {
    this.subject.next(prod)
  }
  getSegments() {
    return this.subject.asObservable();
  }

  sendMessage(prod: any) {
    this.subject.next(prod)
  }
  getMessage() {
    return this.subject.asObservable();
  }

  sendRemoveMessage() {
    this.removeCart.next()
  }
  getRemoveMessage() {
    return this.removeCart.asObservable();
  }

  sendAddress(data: any) {
    this.addressMessage.next(data)
  }
  getAddress() {
    return this.addressMessage.asObservable();
  }

  sendUserProfileData(data: any) {
    this.userProfile.next(data)
  }
  getUserProfileData() {
    return this.userProfile.asObservable();
  }

  /*
  Wishlist
*/

  RequestAddToWishList(product: any) {
    this.wishList.next(product)
  }
  getAddToWishList() {
    return this.wishList.asObservable()
  }
  /*
    wishlist end
  */


  // payment status

  sendPaymentStatus(data: any) {
    this.paymentStatus.next(data)
  }

  getPaymentStatus() {
    return this.paymentStatus.asObservable()
  }

  keepReferenceId(data: any) {
    this.reference_id.next(data)
  }

  getReference_id() {
    return this.reference_id.asObservable()
  }

  sendStatus(data: any) {
    this.cashOndelivery.next(data)
  }

  getStatus() {
    return this.cashOndelivery.asObservable()
  }


  dontRefresh() {
    this.dontRefersh.next()
  }

  getRefreshData() {
    return this.dontRefersh.asObservable()
  }


  cartCount(data: any) {
    this.count.next(data)
  }

  getCartCount() {
    return this.count.asObservable()
  }

  cartPrice(data: any) {
    this.price.next(data)
  }

  getCartprice() {
    return this.price.asObservable()
  }

  sendpopupclose() {
    this.popupclose.next()
  }
  getpopupclose() {
    return this.popupclose.asObservable()
  }
  sendaddressmodalclose() {
    this.addressmodalclose.next()
  }
  getaddressmodalclose() {
    return this.addressmodalclose.asObservable()
  }
}
