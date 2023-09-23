import { Component, Input, OnInit, EventEmitter, Output ,AfterViewInit} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { OrderService } from 'src/app/services/order.service';
import { RatingreviewService } from 'src/app/services/ratingreview.service';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit,AfterViewInit {
  hash = "#"
  isreason:any
  isAvailableInCart = false
  cartData:any = []
  trackModal = "TrackModal_"
  cancelModal ="CancelModal_"
  returnModal="ReturnModal_"
  receiptModal = "ReceiptModal_"
  reviewModal="reviewModal_"
  currentStatus = ""
  CurrentorderExpected = ""
  currentId = 0
  currentQty = 1
  isLogin = false
  headline = ""
  imageArray:any = [
    {
      image:"",
      image1:""
    },
    {
      image:"",
      image1:""
    },
    {
      image:"",
      image1:""
    },
  ]
  reviewComment = ""
  review:any = []
  wish=false;
  cart= true;
  later=false;
  modalType = "cancel"
  resone = ""
  returnReason=""
  returnComment=""
  selectReasone="Select"
  comment = ""
  products:any = {}
  order_line_id:any
  reasonInputActive=false
  is_star=false
  is_star1=false
  is_star2=false
  is_star3=false
  is_star4=false
  ratings=""
  max=5
  reviewInventeryId=0
  @Input()totalPrice = ""
  @Input()orderExpected =""
  @Input()category=""
  @Input()productQty = 3
  @Input()productImg = "../../../assets/assets/fridge.png";
  @Input()productName = "Samsung 6.5 kg Fully-Automatic Top Loading  Washing Machine (WA65A4002VS/TL, Imperial Silver, Center Jet Technology";
  @Input()estimateDate = "Wednesday 03, March, 2021";
  @Input()currency= "AED";
  @Input()currentPrice = 0;
  @Input()previousPrice =0;
  @Input()maxQty = 0;
  @Input()id=0;
  @Input()variant_id=0;
  @Input()inventory_id=0;
  @Input()type = "CART";
  @Input()status = ""
  @Input()is_returable = true
  @Input()orderId=0
  @Input()deliveryDate=""
  @Input()avaliablestock=""
  @Input()virtual_stock=0
  @Input()available_qty=0
  @Input()max_order_limit=0
  @Input()min_order_limit=0
  @Input()stock_count=0
  @Input()Available_stock=false
  starRating:number=5
  rating3:any
  fb:any 
  currentRating:any
  reviewMainId:any
  ratinVariantId:any
  constructor(private router:Router,
    private _reviewService:RatingreviewService,
    private _order:OrderService,
    private _cartService:CartService, 
    private _wishlistService:WishlistService,
    private msg:MessengerService,
    private tosre:ToastrService) { 
    this.cartData = this._cartService.getCartValue()
    
  }
  @Output() wishEvent = new EventEmitter();
  @Output() RemoveWishEvent = new EventEmitter();
  @Output() cartEvent = new EventEmitter();
  @Output() RemoveCartEvent = new EventEmitter();
  @Output() RemoveEvent = new EventEmitter();

  addWishList(){
    this.wishEvent.emit();
  }
  
  removeWish(){
    this.RemoveWishEvent.emit()
  }

  
  cancelReasons(e:any){
    this.resone=e.target.value
  }

  remove(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData != null){
     
      this._cartService.removeCart(this.variant_id) 
    }else{
      setTimeout(() => {
        window.location.reload()
      }, 2000);
      this._cartService.removeLocalCart(this.variant_id) 
    }
  }
  
  addToCart(){
    if(this.min_order_limit!=null){
      this.currentQty=this.min_order_limit
    }
    let product = {
      id: this.variant_id,
      inventory_id: this.inventory_id,
      image1: this.productImg,
      name:this.productName,
      price:this.currentPrice
    }
    this._cartService.addToCart(product,this.currentQty)
  }

  saveForLater(){
    // setTimeout(() => {
    //   window.location.reload()
    // }, 2000);
    this._cartService.saveForLater(this.variant_id) 
  }

  removeSaveforLater(){
    // setTimeout(() => {
    //   window.location.reload()
    // }, 2000);
    this._cartService.removeSaveForLaterData(this.variant_id) 
  }

  moveToCart(aval:any,vir:any){
    // setTimeout(() => {
    //   window.location.reload()
    // }, 2000);
    if(aval==0||vir==0){
      this._cartService.moveToCartFromSaveForLater(this.variant_id) 
    }else{
      this.tosre.warning("No stock avaliable")
    }
    
  }

  ngAfterViewInit(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData !=null){
      this.isLogin = true
      this.cartData.filter((data:any)=>{
        if(data.variant_id == this.variant_id){
          this.isAvailableInCart = true
        }
      })
      this.msg.getRefreshData().subscribe((data:any)=>{
        this.cartData.filter((data:any)=>{
          if(data.variant_id == this.variant_id){
            this.isAvailableInCart = true
          }
        })
      })
    }
    if ((this.min_order_limit != null && this.min_order_limit != 0) || (this.max_order_limit != null && this.max_order_limit != 0) ) {
      this.min_order_limit  = (this.min_order_limit != null && this.min_order_limit != 0) ? this.min_order_limit : 1
      this.max_order_limit  = (this.max_order_limit != null && this.max_order_limit != 0 && this.max_order_limit > this.stock_count) ? this.stock_count : this.max_order_limit
    }else{
      this.max_order_limit  = (this.max_order_limit == null || this.max_order_limit == 0 ) ? (this.stock_count > 0) ? this.stock_count : 10 : 10
      this.min_order_limit = 1
    }  
    this.max_order_limit = this.max_order_limit > 10 ? 10 : this.max_order_limit
    this.maxQty=this.max_order_limit
    this.currentQty=this.min_order_limit
  }


  ngOnInit(): void {
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if ((this.min_order_limit != null && this.min_order_limit != 0) || (this.max_order_limit != null && this.max_order_limit != 0) ) {
      this.min_order_limit  = (this.min_order_limit != null && this.min_order_limit != 0) ? this.min_order_limit : 1
      this.max_order_limit  = (this.max_order_limit != null && this.max_order_limit != 0 && this.max_order_limit > this.stock_count) ? this.stock_count : this.max_order_limit
    }else{
      this.max_order_limit  = (this.max_order_limit == null || this.max_order_limit == 0 ) ? (this.stock_count > 0) ? this.stock_count : 10 : 10
      this.min_order_limit = 1
    }  
    this.max_order_limit = this.max_order_limit > 10 ? 10 : this.max_order_limit
    this.maxQty=this.max_order_limit
    this.currentQty=this.min_order_limit
    if(userData !=null){
      this.isLogin = true
    }else{
      this.isLogin = false
    }
    if(this.type == "CART"){
      this.wish=false;
      this.later=false;
      this.cart= true;
    }
    else if(this.type == "WISH"){
      this.wish=true;
      this.later=false;
      this.cart= false;
    }
    else if(this.type == "LATER"){
      this.wish=false;
      this.later=true;
      this.cart= false;
    }
    this.msg.getRefreshData().subscribe((data:any)=>{
      this.cartData.filter((data:any)=>{
        if(data.variant_id == this.variant_id){
          this.isAvailableInCart = true
        }
      })
    })
    this.msg.getId().subscribe((ID:any)=>{
     this.currentId=ID
    })
    this.msg.getVaientId().subscribe((ID:any)=>{
      this.reviewMainId=ID
    })
    this.msg.getRatingId().subscribe((ID:any)=>{
    this.ratinVariantId=ID
    })
  }


  qty(i:number){
    return new Array(i+1);
  }


  qtyChanger(prod:any){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null ){
      let product = {
        id: this.variant_id,
        inventory_id: this.inventory_id,
        image1: this.productImg,
        name:this.productName,
        price:this.currentPrice,
      } 
      this._cartService.addToLocalCart(product,this.productQty)
      setTimeout( () => { 
        window.location.reload()
      }, 500);
      return
    }else{
      let product = {
        id: this.variant_id,
        inventory_id: this.inventory_id,
        image1: this.productImg,
        name:this.productName
      }
      this._cartService.addToCart(product,this.productQty)
      // setTimeout( () => { 
      //   window.location.reload()
      // }, 800);
    }
  }


  removeFromWishlist(){
    this._wishlistService.addToWishList(this.variant_id)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  modalTypeChanger(type:any){
    this.modalType = type
    this.reasonInputActive=false
  }

  
  changeReason(){
    if(this.resone ==''){
      this.isreason = false
    }
  }


  cancelOrder(){
    if(this.resone ==''){
      this.isreason = false
      return
    }
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null) return
    let submit ={ 
      reason: this.resone, 
      customer_notes: this.comment, 
      user_id: userData.customer_id,
      orderline_id: this.currentId
    }
    if(this.modalType == 'cancel'){
      this._order.cancelOrder(submit)
    
    }
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  returnOrderLineId(id:any){
    this.msg.idPassing(id)
  }
  
   reviewId(id:any){
    this.msg.variantIdPassing(id)
  }

  ratingId(id:any){
    this.msg.ratingID(id)
  }

  returnOrder(){
    if(this.resone ==''){
      this.isreason = false
      return
    }
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null) return
    let submit ={ 
      reason: this.resone, 
      customer_notes: this.comment, 
      user_id: userData.customer_id, 
      orderline_id: this.currentId
    }
    this._order.returnOrder(submit)
    
  }

  onUploadImageOne(event:any,type:any,index:any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.imageArray[index].image = event.target.result
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  createPost(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null ) return  
    let review = {
      variant_id: this.reviewMainId,
      customer_id: userData.customer_id,
      customer_code:userData.customer_usercode, 
      title: this.headline, 
      review: this.reviewComment, 
      image1: this.imageArray[0].image1,
      image2: this.imageArray[1].image1, 
      image3: this.imageArray[2].image1
    }
    this._reviewService.postReview(review)
    this.headline=""
    this.reviewComment=""
  }

  currentStatusUpdate(status:any,id:any,orderExpected:any){
    this.currentStatus = status
    this.currentId = id
    this.CurrentorderExpected = orderExpected
  }

  currentStatusUpdatereturn(status:any,id:any,orderExpected:any){
    this.currentStatus = status
    this.currentId = id
    this.CurrentorderExpected = orderExpected
  }

  routeTo(id:any){
    this.router.navigate(['/product/'+id])
  }


  postRating(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null ) return
      let rating={
        variant_id: this.ratinVariantId, 
        rating: this.currentRating,
        customer_id: userData.customer_id,
        customer_code: userData.customer_usercode,
        ease_of_use:0,
        value_for_money:0
      }
    this._reviewService.createRatingPost(rating)
  }

  rateChange(is_star:any){
  }



}
