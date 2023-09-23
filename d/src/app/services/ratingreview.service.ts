import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { MessengerService } from './messenger.service';


@Injectable({
  providedIn: 'root'
})
export class RatingreviewService {
  // api_cart_checkout = environment.api_rating
  api_check_reviewable = environment.api_cart_checkout
  api_user = environment.api_user
  api_inventory= environment.api_inventory
  api_finance=environment.api_finance
  api_promotion=environment.api_promotion
  api_loyality=environment.api_loyality
  api_rating=environment.api_rating
  createRating="/rating_review/create-rating"
  checkIsReviewable = "/order/list-order-by-customer/"
  listComments = "/rating_review/list-comments-by-variantid/"
  createReview = "/rating_review/craete-review"
  ratingByVarient = "/rating_review/list-ratings-by-variantid/"
  listReview="https://api-rating-review-uat.ahlancart.com/rating_review/read-review"

  // createRating="/rating_review/create-rating "
  constructor(private http: HttpClient,
              private toastr:ToastrService,
              private msg:MessengerService) { 
  }

  
  getComments(id:any){
    return this.http.get<any>(this.api_rating+this.listComments+id)
  }
  
  getRatingOnVarient(id:any){
    return this.http.get<any>(this.api_rating+this.ratingByVarient+id)
  }

  isReviewable(id:any){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData == null ) return
    let code = userData.customer_usercode
    return this.http.get<any>(this.api_check_reviewable+this.checkIsReviewable+code+'?item_no='+id+'&status_delivery=true')
  }

  postReview(review:any){
    this.http.post(this.api_rating+this.createReview,review).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message)
      }else{
        this.toastr.warning(data.message)
      }
    })
  }

  createRatingPost(rating:any){
    this.http.post(this.api_rating+this.createRating,rating).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message)
      }else{
        this.toastr.warning(data.message)
      }
    })
  }

  listReviewAhlan(data:any){
    this.http.post(this.listReview,data).toPromise().then((data:any)=>{
      if(data.status === 'success'){
      }else{
      }
    })
  }
  
  getWalletPoints(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({ 
      Authorization: ` ${tokens}` 
    }) 
    return this.http.get<any>(this.api_loyality+"/loyality/transaction/points-redeem",{headers})
  }

  getTotalAmount(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({ 
      Authorization: ` ${tokens}` 
    }) 
    return this.http.get<any>(this.api_loyality+"/loyality/card/user-loyality-card",{headers})
  }

  getRating(){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    })
    return this.http.get<any>(this.api_rating+"/rating-review/get-rating-review-list-by-user ",{headers})

  }

  postPoints(rating:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({ 
      Authorization: ` ${tokens}` 
    }) 
    this.http.post(this.api_loyality+"/loyality/transaction/points-redeem",rating,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.dontRefresh()
                // setTimeout(() => {
        //   window.location.reload()
        // }, 500); 
      }else{
        this.toastr.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }


  
  reviewCreation(rating:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    })
    this.http.post(this.api_rating+"/rating-review/create-review",rating,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.send1(data.status)
      }else{
        this.toastr.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  reviewDeleting(id:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    })
    this.http.delete(this.api_rating+"/rating-review/delete-review/"+id,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){ 
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.send1(data.status)
      }else{
        this.toastr.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }  

  ratingCreation(d:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    })
    this.http.post(this.api_rating+"/rating-review/create-rating ",d,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.msg.send2(data.status)
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
      }else{
        this.toastr.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }

  
  ratingDeleting(id:any){
    let user:any = localStorage.getItem('marketplaceUser') 
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token 
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}`
    })
    this.http.delete(this.api_rating+"/rating-review/delete-rating/"+id,{headers}).toPromise().then((data:any)=>{
      if(data.status === 'success'){
        this.msg.send2(data.status)
        this.toastr.success(data.message,'',{positionClass: 'toast-bottom-center'})
        this.msg.dontRefresh()
      }else{
        this.toastr.warning(data.message,'',{positionClass: 'toast-bottom-center'})
      }
    })
  }
  

}
