import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'

@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.scss']
})
export class TermsofuseComponent implements OnInit,AfterViewInit  {
  termsUse:any = {}
  constructor(private policy:PolicysService) { }
  
  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "TERMS OF USE"){
          this.termsUse = data
        }
      })
    })
  }

}
