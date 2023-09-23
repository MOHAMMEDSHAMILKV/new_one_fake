import { MessengerService } from './../../services/messenger.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-successorder',
  templateUrl: './successorder.component.html',
  styleUrls: ['./successorder.component.scss']
})
export class SuccessorderComponent implements OnInit {
  order:any
  weburl = environment.footer_credit_link
  webdomain = environment.footer_credit_text
  statusMessage:any
  designChage=false
  designChageOne=false
  productDetails:any
  orderDetail:any
  orderDetail1:any
  paymentStatus:any="success"
  constructor(private msg:MessengerService,
              private orderService:OrderService,
              private route:ActivatedRoute,
              private router:Router) {}
  ngOnInit(): void {
      let orderId:any = localStorage.getItem("afterorderProduct")
      let orderIdFind = JSON.parse(orderId)
      this.orderService.getOrderDetail(orderIdFind).subscribe((data:any)=>{
        this.orderDetail=data.data
        console.log(this.orderDetail);
        
      }) 
      this.orderService.singleDetails(orderIdFind).subscribe((data:any)=>{
        this.orderDetail1=data.data.results[0]
        
      }) 
      this.msg.getOrderResponse().subscribe((data:any)=>{
        this.order = data.data
      })
      let payment:any = localStorage.getItem("payment_reference")
      let payment_ref = JSON.parse(payment)
      // console.log(payment_ref,"=======");
      if(payment_ref!=null){
        let status={
          reference_id:payment_ref
        } 
        this.orderService.paymentStatus(status)
        this.msg.getPaymentStatus().subscribe((d:any)=>{
           this.paymentStatus=d 
        }) 
      } 
  } 
  routeToDetailPage(){
    let url="/sidra-profile/orderdetail/"
    this.router.navigate([url+this.orderDetail.id])
  } 
}
