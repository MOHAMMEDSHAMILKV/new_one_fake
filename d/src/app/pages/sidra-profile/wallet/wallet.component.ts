import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { RatingreviewService } from 'src/app/services/ratingreview.service';

RatingreviewService
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  walletData:any
  points=""
  getPoints:any
  pointData:any
  constructor(private review:RatingreviewService,
              private msg:MessengerService) { }

  ngOnInit(): void {
    this.review.getWalletPoints().subscribe((data:any)=>{
      this.getPoints=data.data
    }) 
    this.review.getTotalAmount().subscribe((data:any)=>{
      this.walletData=data.data
    })
    this.msg.getRefreshData().subscribe((d:any)=>{
      this.review.getWalletPoints().subscribe((data:any)=>{
        this.getPoints=data.data
      }) 
    }) 
  }

  calculation(d:any){
     let x=parseInt(d)
     let y=parseFloat(this.getPoints.redeam_currency.base_rate)
     this.pointData=x*y
  }

  postPoints(){
    let points={  
      redeam_currency:"AED",
      points:this.points
    }
    this.review.postPoints(points)
  }
  
}
