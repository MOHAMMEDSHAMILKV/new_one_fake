import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'

@Component({
  selector: 'app-termsofsales',
  templateUrl: './termsofsales.component.html',
  styleUrls: ['./termsofsales.component.scss']
})
export class TermsofsalesComponent implements OnInit,AfterViewInit {
  termsSales:any = {}
  constructor(private policy:PolicysService) { }

  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "TERMS OF SALE"){
          this.termsSales = data
        } 
      })
    })
  }

}
