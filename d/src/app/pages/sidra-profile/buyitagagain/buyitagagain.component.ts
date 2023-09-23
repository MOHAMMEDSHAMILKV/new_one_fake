import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-buyitagagain',
  templateUrl: './buyitagagain.component.html',
  styleUrls: ['./buyitagagain.component.scss']
})
export class BuyitagagainComponent implements OnInit {

  constructor(private order:OrderService) { }
  cartProductImage:any=[
    {"image1":"../../../assets/products/prod1.svg"},
    {"image1":"../../../assets/products/prod2.svg"},
    {"image1":"../../../assets/products/prod3.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
  ]  
  buyItArray:any=[]
  ngOnInit(): void {
     this.order.getBuyItAgain().subscribe((d:any)=>{
       this.buyItArray=d.data?.results
     })
  }

}
