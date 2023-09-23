import { Injectable, OnInit } from '@angular/core';
import { MessengerService } from './messenger.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../models/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WishlistService implements OnInit {
  getRefreshData() {
    throw new Error('Method not implemented.');
  }
  api_cart_checkout = environment.api_cart_checkout
  api_check_reviewable = environment.api_cart_checkout
  api_user = environment.api_user
  api_inventory= environment.api_inventory
  api_finance=environment.api_finance
  api_promotion=environment.api_promotion
  api_loyality=environment.api_loyality
  api_rating=environment.api_rating
  api_payment=environment.api_payment
  wishlist:Cart[]=[]
  wishlistCreate = "/wishlist/create-wish-list"
  wishlistGet = "/wishlist/list-wish-list-by-customer/"
  wishistGetWithoutGroup = "/wishlist/list-wish-list-by-customer-without-group/"
  checkWishlist="/wishlist/check-whishlist-customer/"
  wishlistData:any = []
  wishwithoutgroup:any 
  permission="/wishlist/share-wish-group"
  constructor(
    private messageService: MessengerService,
    private toastr: ToastrService,
    private http: HttpClient,
  ){
    this.getWishListData()
  }
  ngOnInit(): void {

  }

  getWishListData(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    // if(userDetails == null) return
    return this.http.get<any>(this.api_cart_checkout+"/wishlist/list-wish-list-by-customer/default",{headers})
    // wish.subscribe((data:any)=>{
    //   this.wishwithoutgroup = data.data
    // })
  }

  
  getWishListGroup(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/wishlist/list-wishlist-group-by-customer",{headers})

  }

  userWishListId(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/wishlist/user-wish-list",{headers})
  }

  unWishlisted(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/delete-wishlist-varient/"+id,null,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        // this.messageService.dontRefresh()
        let x:any="success"
        this.messageService.sendWish(x)
      }
    })
  }

  getWishlistGroupData(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/wishlist/list-wish-list-by-customer/"+id,{headers})

  }

  getIswishlisted(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    return this.http.get<any>(this.api_cart_checkout+"/wishlist/check-whishlist-customer/"+id,{headers})

  }

  getWithoutData(){
    return this.wishwithoutgroup
  }

  getWishList(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    
    return this.http.get<any>(this.api_cart_checkout+this.wishlistGet+userDetails.customer_id)
  }

  getCheckWishList(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    
    return this.http.get<any>(this.api_cart_checkout+this.checkWishlist+userDetails?.customer_usercode+'/'+id)
  }

  addToWishList(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    let wishData = {
      variant_id : id, 
      // customer_id : userData.customer_id, 
      // customer_code : userData.customer_usercode, 
      group_id :null
    }
    this.http.post(this.api_cart_checkout+this.wishlistCreate,wishData).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh()
      }
    })
  }

  createWishlistGroup(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/create-wish-list-group",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh()
        this.messageService.sendStatus(data.status)
      }
    })
  }

  createWishlist(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/create-wish-list",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh()
      }
    }) 
  }

  deleteWishlist(id:any,groupId:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/delete-wishlist-item/"+id+'/'+groupId,null,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh()
      }
    })
  }

  deleteWishlistGroup(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/delete-wishlist-group/"+id,null,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh()
      }
    })
  }

  sharedWishListProPermission(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/share-wish-group",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh()
      }  
    }) 
  }
  
  sharedwishListCreation(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.http.post(this.api_cart_checkout+"/wishlist/shared-wish-item-add",data,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.messageService.dontRefresh() 
        this.messageService.send(data)
      }  
    }) 
  }
  
}
