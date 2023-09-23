import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { RatingreviewService } from 'src/app/services/ratingreview.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  currentRating:any
  val1:any=5
  isEdited=false
  images="../../../../assets/products/Rectangle 20530.svg"
  imageShow:any
  imageshow1:any=""
  imageshow2:any=""
  imageshow3:any=""
  imageshow4:any=""
  imageshow5:any=""
  imageArray:any=[]
  ratingreview:any=[]
  editedItem:any
  imageIdArray:any=[]
  userData:any
  api_rating=environment.api_rating
  constructor(private rating:RatingreviewService,
              private http:HttpClient,
              private msg:MessengerService) { }
  
  ngOnInit(): void {
    this.rating.getRating().subscribe((data:any)=>{
      this.ratingreview=data.data?.results
    })
    this.msg.getRefreshData().subscribe((d:any)=>{
      this.rating.getRating().subscribe((data:any)=>{
        this.ratingreview=data.data?.results
      })
    })
  }

  edited(item:any){
    this.isEdited=true
    this.editedItem=item
  }

  back(){
    this.isEdited=false
  }

  imageUpload(event:any,type:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${tokens}` 
    })  
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const profilepic = <File>event.target.files[0]
      const fd = new FormData();
      const name=event.target.value
      fd.append('image',profilepic,profilepic.name)
      const imageData={
        upload:fd,
      }
      this.http.post(this.api_rating+'/rating-review/upload-image',fd).toPromise().then((d:any)=>{
        this.imageIdArray.push(d?.data)
        let image={
          image:d?.url
        }
        this.imageArray.push(image)
      })
    }
  }

  splice(i:any){
    this.imageArray.splice(i,1)
    this.imageIdArray.splice(i,1)
  }

  createRatingAndReview(){
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
     let review1={
        customer_id:this.userData?.customer_id,
        customer_code:this.userData?.customer_usercode,
        title:this.editedItem.review_data.title,
        review:this.editedItem.review_data.review,
        img1:this.imageIdArray[0],
        img2:this.imageIdArray[1],
        img3:this.imageIdArray[2],
        img4:this.imageIdArray[3],
        img5:this.imageIdArray[4],
        variant_id:this.ratingreview[0]?.variant_id
     }
     this.rating.reviewCreation(review1)
     let rating1={
        rating: this.editedItem.rating, 
        value_for_money: 0, 
        ease_of_use: 0, 
        customer_id: this.userData?.customer_id, 
        customer_code: this.userData?.customer_usercode, 
        variant_id: this.ratingreview[0]?.variant_id 
     }
     this.rating.ratingCreation(rating1)
     this.msg
  }

  deleteRatingAndReview(id1:any,id2:any){
    // this.rating.ratingDeleting(id1)
    // this.rating.reviewDeleting(id2)
  }

}
