import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterLink } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  is_active=false
  is_subscribe=false
  allOrderArray:any=[]
  heading=true
  
  constructor(private route: ActivatedRoute,private order:OrderService,private router:Router,private msg:MessengerService) {
    this.route.params.subscribe((data:any)=>{
      
      if(data.name=="subscribed"){
         this.is_subscribe=true
      }else{
        this.is_subscribe=false
      }
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      if(data.name=="subscribed"){
         this.is_subscribe=true
      }else{
        this.is_subscribe=false
      }
    })
    this.order.allOrderList().subscribe((d:any)=>{
      this.allOrderArray=d.data?.results
    })
    const isMobileView = window.innerWidth <= 575;

    if (isMobileView) {
      this.heading = false;
     
    }
    
  }
  

  routeToDetailPage(id:any){
    let url="/sidra-profile/orderdetail/"
    this.router.navigate([url+id])
  } 

  isFilter(e:any){
    if(e.target.value=="Default"){
      this.order.allOrderList().subscribe((d:any)=>{
        this.allOrderArray=d.data?.results
      })
    }else{
      this.order.allOrderListFilter(e.target.value).subscribe((d:any)=>{
        this.allOrderArray=d.data?.results
      })
    }
  }
  
  navigateProductPage(id:any){
    this.router.navigate(['/product/' + id])
  } 

  
}
