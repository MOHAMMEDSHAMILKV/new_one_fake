import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { RatingreviewService } from 'src/app/services/ratingreview.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { MessengerService } from 'src/app/services/messenger.service';
import UIkit from 'uikit';
@Component({
  selector: 'app-odrerdetail',
  templateUrl: './odrerdetail.component.html',
  styleUrls: ['./odrerdetail.component.scss']
})
export class OdrerdetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private order:OrderService,
              private router:Router,
              private http:HttpClient,
              private review:RatingreviewService,
              private msg:MessengerService) { }
  productRoute:any
  orderDetail:any
  reson:any
  orderTrackingDetail:any=[]
  currentStatus:any
  returnReplace_active=false
  images="../../../../assets/products/Rectangle 20530.svg"
  imageShow:any
  imageshow1:any=""
  imageshow2:any=""
  imageshow3:any=""
  imageshow4:any=""
  imageshow5:any=""
  imageArray:any=[]
  highlights:any
  description:any
  imageIdArray:any=[] 
  userData:any
  rating:any = 0;
  stars!: any[];
  activeStar:any
  api_rating=environment.api_rating
  ngOnInit(): void {    
    this.productRoute ={
      id: this.route.snapshot.params['id'],
    } 
    this.order.singleDetails(this.productRoute.id).subscribe((data:any)=>{
      this.orderDetail=data.data.results[0]
      this.currentStatus=this.orderDetail?.status
      console.log(this.orderDetail);
      
      // this.order.trackingDetail(this.orderDetail?.Orderline_id).subscribe((d:any)=>{
      //   this.orderTrackingDetail=d.data  
      //   this.currentStatus=this.orderTrackingDetail[0]?.order_stages
      //   console.log(this.orderTrackingDetail,"=--=--=--=--=---=---=-=--=--=-=-");
      // })  
    }) 
    this.stars = Array(5).fill(false);
  }  

  cancelOrder(){
    let resons={
      reason: "reson",          
      customer_notes: this.reson,          
      orderline_id: this.productRoute.id
    }
    this.order.cancelorder(resons)
    this.msg.getStatus().subscribe((d:any)=>{
      if(d=='success'){
        UIkit.modal('#cancelOrder').hide();  
      }
    })
  }

  replacement(){
    this.returnReplace_active=true
  }

  routePage(id:any){
      this.router.navigate(['/returnandreplacement/'+id])
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

  rate(index: number,e:any) {
    this.rating = index;
    this.stars = this.stars.map((_, i) => i < index);
    this.activeStar = this.stars.filter(element => element).length;
    
  }

  createRatingAndReview(){
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
     let review1={
        customer_id:this.userData?.customer_id,
        customer_code:this.userData?.customer_usercode,
        title:this.highlights,
        review:this.description,
        img1:this.imageIdArray[0],
        img2:this.imageIdArray[1],
        img3:this.imageIdArray[2],
        img4:this.imageIdArray[3],
        img5:this.imageIdArray[4],
        variant_id:this.orderDetail?.variant_id
     } 
     this.review.reviewCreation(review1)
     let rating1={
        rating: this.activeStar, 
        value_for_money: 0, 
        ease_of_use: 0, 
        customer_id: this.userData?.customer_id, 
        customer_code: this.userData?.customer_usercode, 
        variant_id: this.orderDetail?.variant_id 
     }
     this.review.ratingCreation(rating1)
  }

  onRatingChange(rating: number) {
    // Handle the emitted rating value here
  }
  downloadInvoice(){
    this.order.download_Invoice(this.orderDetail.Orderline_id).subscribe((d:any)=>{
      // window.open(d.url,"__blank")
      const pdfUrl = d.url; // Replace with your PDF URL

      // Generate a unique filename for the downloaded PDF
      const filename = `Invoice${new Date().getTime()}.pdf`;
  
      // Trigger the file download
      saveAs(pdfUrl, filename);
    })
  }
}
