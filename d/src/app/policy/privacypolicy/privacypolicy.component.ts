import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'
@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit,AfterViewInit {
  privacyPolicy:any = {}
  constructor(private policy:PolicysService) { }

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
  }
}
