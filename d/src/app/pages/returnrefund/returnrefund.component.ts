import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service';

@Component({
  selector: 'app-returnrefund',
  templateUrl: './returnrefund.component.html',
  styleUrls: ['./returnrefund.component.scss']
})
export class ReturnrefundComponent implements OnInit {

  returnRefund:any = {}
  constructor(private policy:PolicysService) { }
  
  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "Returns and Refund Policy"){
          this.returnRefund = data
        }
      })
    })
  }

}
