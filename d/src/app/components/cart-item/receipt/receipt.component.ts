import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  orderDetails:any = []
  order_meta:any
  orderAddress:any
  billingAddress:any
  shopeAddress:any
  orderCustomer:any
  orderProducts:any = []
  paymentDate:any

  totalPrice = 0
  netTotal = 0
  tax:any
  currency = "AED"
  @Input()orderId = 0
  constructor(private _order:OrderService) { }

  ngOnInit(): void {
    this._order.getGetOrderReceipt(this.orderId).subscribe((data:any)=>{
      this.orderDetails = data?.data
      this.order_meta = this.orderDetails?.order_meta
      this.orderAddress = this.order_meta?.address_data
      this.orderCustomer = this.order_meta?.customer_data
      this.tax = this.order_meta?.tax_total_amount
      this.billingAddress = this.order_meta?.billing_address
      this.shopeAddress = this.order_meta?.shope_address
      this.orderProducts = this.orderDetails?.order_lines
      this.paymentDate = this.orderDetails?.order_payment?.updated
      if(this.orderProducts !=undefined){
        this.orderProducts.filter((data:any)=>{
          this.totalPrice = data.amount + this.totalPrice
        })
      }
    })
  }

}
