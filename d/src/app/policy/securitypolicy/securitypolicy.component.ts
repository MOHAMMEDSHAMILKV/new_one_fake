import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'

@Component({
  selector: 'app-securitypolicy',
  templateUrl: './securitypolicy.component.html',
  styleUrls: ['./securitypolicy.component.scss']
})
export class SecuritypolicyComponent implements OnInit {

  securityPolicy:any = {}
  constructor(private policy:PolicysService) { }
  
  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "Security Policy"){
          this.securityPolicy = data
        }
      })
    })
  }
}
