import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cashondelivery',
  templateUrl: './cashondelivery.component.html',
  styleUrls: ['./cashondelivery.component.scss']
})
export class CashondeliveryComponent implements OnInit {
  order:any
  weburl = environment.footer_credit_link
  webdomain = environment.footer_credit_text
  statusMessage:any
  designChage=false
  designChageOne=false
  constructor(private msg:MessengerService,
    private orderService:OrderService) {
      this.msg.getStatus().subscribe((data:any)=>{
        if(data=="success"){
          this.designChage=true
        }else{
          this.designChageOne=true
        }
      })
     }

  ngOnInit(): void {
  }

}
