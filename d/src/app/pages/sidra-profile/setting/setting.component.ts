import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  addressList:any=[]
  defaultData:any
  savedCard:any=[]
  constructor(private seller:SellerService,private auth:AuthService,
              private order:OrderService,private msg:MessengerService) { }

  ngOnInit(): void {
    this.auth.getAddressList().subscribe((data:any)=>{
      this.addressList=data.data?.results
      this.defaultData=this.addressList.find((d:any)=>d.is_default==true)
    }) 
    this.seller.getcardDetails().subscribe((d:any)=>{
    })
    this.order.ListCard().subscribe((data: any) => {
      this.savedCard = data.data.results
    }) 
    this.msg.getRefreshData().subscribe(()=>{
      this.order.ListCard().subscribe((data: any) => {
        this.savedCard = data.data.results
      }) 
    })
    console.log("saveeeeeeeeeedcardddddddddd",this.savedCard);
    
  }

  saveCard(){
    let card={
      building_name:this.defaultData.building_name,
      street_name:this.defaultData.street_name,
      city:this.defaultData.city,
      countryCode:this.defaultData.country,
      "cancel_url":"", 
      redirect_url:"https://sidrabazar.com/sidra-profile/setting"
  }
    this.seller.saveCard(card)
  }

  deletecard(id:any){
    this.auth.carddelete(id)
console.log("ididididididididiid",id);

  }

}
