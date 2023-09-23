import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'

@Component({
  selector: 'app-genaralpolicy',
  templateUrl: './genaralpolicy.component.html',
  styleUrls: ['./genaralpolicy.component.scss']
})
export class GenaralpolicyComponent implements OnInit,AfterViewInit {
  
  genaralPolicy:any = {}
  constructor(private policy:PolicysService) { }
  
  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == 'General Policy'){
          this.genaralPolicy = data
        }
      })
    })
  }

}
