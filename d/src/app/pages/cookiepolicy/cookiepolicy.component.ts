import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service';

@Component({
  selector: 'app-cookiepolicy',
  templateUrl: './cookiepolicy.component.html',
  styleUrls: ['./cookiepolicy.component.scss']
})
export class CookiepolicyComponent implements OnInit {

  cookiePolicy:any = {}
  constructor(private policy:PolicysService) { }
  
  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "Cookies Policy"){
          this.cookiePolicy = data
        }
      })
    })
  }

}
