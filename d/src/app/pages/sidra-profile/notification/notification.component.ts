import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationArray:any=[]
  notificatioBarDetail=false
  notificatioBarDetailData:any
  constructor(private notify:NotificationService,private msg:MessengerService) { }

  ngOnInit(): void {
    this.notify.getSidraNotification().subscribe((data:any)=>{
      this.notificationArray=data.data?.results
    })
    this.msg.getRefreshData().subscribe((d:any)=>{
      this.notify.getSidraNotification().subscribe((data:any)=>{
        this.notificationArray=data.data?.results
      })
    })
  }

  changeScreen(data:any){
    this.notificatioBarDetail=true
    this.notificatioBarDetailData=data
    if(this.notificatioBarDetailData.notification_text==''){
      this.notificatioBarDetail=false
    }
    console.log(this.notificatioBarDetailData);
    let d:any={
      notification_id:data.id,
      is_read:true 
    }
    this.notify.notificationPost(d) 
  } 

  clickArrow(){
    this.notificatioBarDetail=false
  }

}
