import { Component, OnInit } from '@angular/core';
import { RatingreviewService } from 'src/app/services/ratingreview.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss']
})
export class ReviewRatingComponent implements OnInit {
  headline = ""
  ratingValue = 0
  ratingValueCustomerCount = 0
  rating_one_star = 0
  rating_one_percentage:any
  rating_two_star = 0
  rating_two_percentage:any
  rating_three_star = 0
  rating_three_percentage:any
  rating_four_star = 0
  rating_four_percentage:any
  rating_five_star = 0
  rating_five_percentage:any
  rating={
    starOne : false,
    starTwo : false,
    starThree : false,
    starFour : false,
    starFive : false
  }
  valueForMoney={
    starOne : false,
    starTwo : false,
    starThree : false,
    starFour : false,
    starFive : false
  }
  easeOfUse={
    starOne : false,
    starTwo : false,
    starThree : false,
    starFour : false,
    starFive : false
  }

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
  productRoute= { id:Number};
  isReviewable = false
  constructor(private _reviewService:RatingreviewService,private route: ActivatedRoute,) {
    this.productRoute ={
      id: this.route.snapshot.params['id'],
    }
   }

  ngOnInit(): void {
    this.productRoute ={
      id: this.route.snapshot.params['id']
    }
    if(this.productRoute.id != null){
      this._reviewService.isReviewable(this.productRoute.id)?.subscribe((data:any)=>{
        if(data.data.results.length == 0){
          this.isReviewable = false
        }else{
          this.isReviewable = true
        }
      })
      this._reviewService.getRatingOnVarient(this.productRoute.id).subscribe((data:any)=>{
        this.ratingValue = data.data.rating_of_variant
        if(this.ratingValue == null){
          this.ratingValue = 0
        }
        this.ratingValueCustomerCount =data.data.ratings_count
        this.rating_one_star = data.data.count_of_1_rating
        this.rating_one_percentage = this.ratingStar(this.ratingValueCustomerCount,this.rating_one_star) + '%'
        this.rating_two_star = data.data.count_of_2_rating
        this.rating_two_percentage = this.ratingStar(this.ratingValueCustomerCount,this.rating_two_star) + '%'
        this.rating_three_star = data.data.count_of_3_rating
        this.rating_three_percentage = this.ratingStar(this.ratingValueCustomerCount,this.rating_three_star) + '%'
        this.rating_four_star = data.data.count_of_4_rating
        this.rating_four_percentage = this.ratingStar(this.ratingValueCustomerCount,this.rating_four_star) + '%'
        this.rating_five_star = data.data.count_of_5_rating
        this.rating_five_percentage = this.ratingStar(this.ratingValueCustomerCount,this.rating_five_star) + '%'
      })
      this._reviewService.getComments(this.productRoute.id).subscribe((data:any)=>{
        this.review = data?.data?.review_data 
      })
    }
    
  }
  ratingStar(rc:any,star:any){
    if(rc == null){
      return 0
    }else{
      return (100/rc)*star
    }
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
      variant_id: this.productRoute.id, 
      customer_id: userData.customer_id,
      customer_code:userData.customer_usercode, 
      title: this.headline, 
      review: this.reviewComment, 
      image1: this.imageArray[0].image1,
      image2: this.imageArray[1].image1, 
      image3: this.imageArray[2].image1
    }
    this._reviewService.postReview(review)
    setTimeout(() => {
      // window.location.reload()
    }, 2000);
  }

  changeRating(type:any){
    if(type === "one"){
      this.rating.starOne = !this.rating.starOne
      if(!this.rating.starTwo)return
      if(!this.rating.starOne){
        this.rating.starTwo = this.rating.starOne
        this.rating.starThree = this.rating.starOne
        this.rating.starFour = this.rating.starOne
        this.rating.starFive = this.rating.starOne
        this.rating.starOne = !this.rating.starOne
      }
      
    }else if(type === "two"){
      this.rating.starTwo = !this.rating.starTwo
      if(this.rating.starTwo){
        this.rating.starOne = this.rating.starTwo
      }
      if(!this.rating.starTwo){
        this.rating.starThree = this.rating.starTwo
        this.rating.starFour = this.rating.starTwo
        this.rating.starFive = this.rating.starTwo
        this.rating.starTwo = !this.rating.starTwo
      }
    }else if(type === "three"){
      this.rating.starThree = !this.rating.starThree
      if(this.rating.starThree){
        this.rating.starOne = this.rating.starThree
        this.rating.starTwo = this.rating.starThree
      }
      if(!this.rating.starThree){
        this.rating.starFour = this.rating.starThree
        this.rating.starFive = this.rating.starThree
        this.rating.starThree = !this.rating.starThree
      }
    }else if(type === "four"){
      this.rating.starFour = !this.rating.starFour
      if(this.rating.starFour){
        this.rating.starOne = this.rating.starFour
        this.rating.starTwo = this.rating.starFour
        this.rating.starThree = this.rating.starFour
      }
      if(!this.rating.starFour){
        this.rating.starFive = this.rating.starFour
        this.rating.starFour = !this.rating.starFour
      }
    }else if(type === "five"){
      this.rating.starFive = !this.rating.starFive
      if(this.rating.starFive){
        this.rating.starOne = this.rating.starFive
        this.rating.starTwo = this.rating.starFive
        this.rating.starThree = this.rating.starFive
        this.rating.starFour = this.rating.starFive
      }
    }
  }
  changeValueForMoneyRate(type:any){
    if(type === "one"){
      this.valueForMoney.starOne = !this.valueForMoney.starOne
      if(!this.valueForMoney.starTwo)return
      if(!this.valueForMoney.starOne){
        this.valueForMoney.starTwo = this.valueForMoney.starOne
        this.valueForMoney.starThree = this.valueForMoney.starOne
        this.valueForMoney.starFour = this.valueForMoney.starOne
        this.valueForMoney.starFive = this.valueForMoney.starOne
        this.valueForMoney.starOne = !this.valueForMoney.starOne
      }
      
    }else if(type === "two"){
      this.valueForMoney.starTwo = !this.valueForMoney.starTwo
      if(this.valueForMoney.starTwo){
        this.valueForMoney.starOne = this.valueForMoney.starTwo
      }
      if(!this.valueForMoney.starTwo){
        this.valueForMoney.starThree = this.valueForMoney.starTwo
        this.valueForMoney.starFour = this.valueForMoney.starTwo
        this.valueForMoney.starFive = this.valueForMoney.starTwo
        this.valueForMoney.starTwo = !this.valueForMoney.starTwo
      }
    }else if(type === "three"){
      this.valueForMoney.starThree = !this.valueForMoney.starThree
      if(this.valueForMoney.starThree){
        this.valueForMoney.starOne = this.valueForMoney.starThree
        this.valueForMoney.starTwo = this.valueForMoney.starThree
      }
      if(!this.valueForMoney.starThree){
        this.valueForMoney.starFour = this.valueForMoney.starThree
        this.valueForMoney.starFive = this.valueForMoney.starThree
        this.valueForMoney.starThree = !this.valueForMoney.starThree
      }
    }else if(type === "four"){
      this.valueForMoney.starFour = !this.valueForMoney.starFour
      if(this.valueForMoney.starFour){
        this.valueForMoney.starOne = this.valueForMoney.starFour
        this.valueForMoney.starTwo = this.valueForMoney.starFour
        this.valueForMoney.starThree = this.valueForMoney.starFour
      }
      if(!this.valueForMoney.starFour){
        this.valueForMoney.starFive = this.valueForMoney.starFour
        this.valueForMoney.starFour = !this.valueForMoney.starFour
      }
    }else if(type === "five"){
      this.valueForMoney.starFive = !this.valueForMoney.starFive
      if(this.valueForMoney.starFive){
        this.valueForMoney.starOne = this.valueForMoney.starFive
        this.valueForMoney.starTwo = this.valueForMoney.starFive
        this.valueForMoney.starThree = this.valueForMoney.starFive
        this.valueForMoney.starFour = this.valueForMoney.starFive
      }
    }
  }
  changeEaseOfUseRate(type:any){
    if(type === "one"){
      this.easeOfUse.starOne = !this.easeOfUse.starOne
      if(!this.easeOfUse.starTwo)return
      if(!this.easeOfUse.starOne){
        this.easeOfUse.starTwo = this.easeOfUse.starOne
        this.easeOfUse.starThree = this.easeOfUse.starOne
        this.easeOfUse.starFour = this.easeOfUse.starOne
        this.easeOfUse.starFive = this.easeOfUse.starOne
        this.easeOfUse.starOne = !this.easeOfUse.starOne
      }
      
    }else if(type === "two"){
      this.easeOfUse.starTwo = !this.easeOfUse.starTwo
      if(this.easeOfUse.starTwo){
        this.easeOfUse.starOne = this.easeOfUse.starTwo
      }
      if(!this.easeOfUse.starTwo){
        this.easeOfUse.starThree = this.easeOfUse.starTwo
        this.easeOfUse.starFour = this.easeOfUse.starTwo
        this.easeOfUse.starFive = this.easeOfUse.starTwo
        this.easeOfUse.starTwo = !this.easeOfUse.starTwo
      }
    }else if(type === "three"){
      this.easeOfUse.starThree = !this.easeOfUse.starThree
      if(this.easeOfUse.starThree){
        this.easeOfUse.starOne = this.easeOfUse.starThree
        this.easeOfUse.starTwo = this.easeOfUse.starThree
      }
      if(!this.easeOfUse.starThree){
        this.easeOfUse.starFour = this.easeOfUse.starThree
        this.easeOfUse.starFive = this.easeOfUse.starThree
        this.easeOfUse.starThree = !this.easeOfUse.starThree
      }
    }else if(type === "four"){
      this.easeOfUse.starFour = !this.easeOfUse.starFour
      if(this.easeOfUse.starFour){
        this.easeOfUse.starOne = this.easeOfUse.starFour
        this.easeOfUse.starTwo = this.easeOfUse.starFour
        this.easeOfUse.starThree = this.easeOfUse.starFour
      }
      if(!this.easeOfUse.starFour){
        this.easeOfUse.starFive = this.easeOfUse.starFour
        this.easeOfUse.starFour = !this.easeOfUse.starFour
      }
    }else if(type === "five"){
      this.easeOfUse.starFive = !this.easeOfUse.starFive
      if(this.easeOfUse.starFive){
        this.easeOfUse.starOne = this.easeOfUse.starFive
        this.easeOfUse.starTwo = this.easeOfUse.starFive
        this.easeOfUse.starThree = this.easeOfUse.starFive
        this.easeOfUse.starFour = this.easeOfUse.starFive
      }
    }
  }
  ratingSubmit(){
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    let userId = userData.customer_id
    let userCode = userData.customer_usercode
    if(userData ==null)return
    let data = {
      variant_id:this.productRoute.id,
      customer_id: userId,
      customer_code: userCode,
      rating: 0,
      value_for_money: 0,
      ease_of_use: 0
    }
    data.rating = Object.values(this.rating).reduce((a:any, item:any) => a + item, 0)
    data.value_for_money = Object.values(this.valueForMoney).reduce((a:any, item:any) => a + item, 0)
    data.ease_of_use = Object.values(this.easeOfUse).reduce((a:any, item:any) => a + item, 0)
    console.table(data);
    this._reviewService.createRatingPost(data)
  }
}
