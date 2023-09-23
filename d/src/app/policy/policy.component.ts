import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { PolicysService } from 'src/app/services/policys.service'

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  privacyPolicy:any = {}
  securityPolicy:any = {}
  genaralPolicy:any={}
  dataPolicy:any={}
  cookiePolicy:any={}
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private policy:PolicysService) { }

    ngAfterViewInit(){
      // window.scroll(0,0)
    }

    ngOnInit(): void {
      let privacy = this.policy.getPolicy()
      privacy.subscribe((data:any)=>{
        let privacyArray = data.data
        privacyArray.filter((data:any)=>{
          if(data.title == "Privacy Policy"){
            this.privacyPolicy = data
          }
        })
      })
      privacy.subscribe((data:any)=>{
        let privacyArray = data.data
        privacyArray.filter((data:any)=>{
          if(data.title == "Security Policy"){
            this.securityPolicy = data
          }
        })
      })
      privacy.subscribe((data:any)=>{
        let privacyArray = data.data
        privacyArray.filter((data:any)=>{
          if(data.title == 'General Policy'){
            this.genaralPolicy = data
          }
        })
      })
      privacy.subscribe((data:any)=>{
        let privacyArray = data.data
        privacyArray.filter((data:any)=>{
          if(data.title == "Data Policy"){
            this.dataPolicy = data
          }
        })
      })
      privacy.subscribe((data:any)=>{
        let privacyArray = data.data
        privacyArray.filter((data:any)=>{
          if(data.title == "Cookies Policy"){
            this.cookiePolicy = data
          }
        })
      })
    }

  selectedTab = "Tab1";

  makeActive(tab: string) {
    this.selectedTab = tab;
   }


}
