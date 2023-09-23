import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-prefrence',
  templateUrl: './prefrence.component.html',
  styleUrls: ['./prefrence.component.scss']
})
export class PrefrenceComponent implements OnInit {

  constructor(private notify:NotificationService) { }
  reminderActive=false
  ngOnInit(): void {

  }

  changeNotification(e:any,d:any){
    if(d=='reminders'){
      if(e.target.checked==true){
          this.reminderActive=true
          let notify={
            reminders:true
          }
          let final={
            notification:true,
            notification_sub:notify
          }
          this.notify.notificationActives(final)
      }else{
        this.reminderActive=false
        let notify={
          reminders:false
        }
        let final={
          notification:true,
          notification_sub:notify
        }
        this.notify.notificationActives(final)
      }
    }
    if(d=='new_offers'){
      if(e.target.checked==true){
        let notify={
          new_offers:true
        }
        let final={
          notification:true,
          notification_sub:notify
        }
        this.notify.notificationActives(final)
    }else{
      let notify={
        new_offers:false
      }
      let final={
        notification:true,
        notification_sub:notify
      }
      this.notify.notificationActives(final)
    }
    }
    if(d=='your_shipment'){
      if(e.target.checked==true){
        let notify={
          your_shipment:true
        }
        let final={
          notification:true,
          notification_sub:notify
        }
        this.notify.notificationActives(final)
    }else{
      let notify={
        your_shipment:false
      } 
      let final={
        notification:true,
        notification_sub:notify
      }
      this.notify.notificationActives(final)
    }
    }
    if(d=='your_recommendations'){
      if(e.target.checked==true){
        let notify={
          your_recommendations:true
        }
        let final={
          notification:true,
          notification_sub:notify
        }
        this.notify.notificationActives(final)
    }else{
      let notify={
        your_recommendations:false
      } 
      let final={
        notification:true,
        notification_sub:notify
      }
      this.notify.notificationActives(final)
    }
    }
  }

}
