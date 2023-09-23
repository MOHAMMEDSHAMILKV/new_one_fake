import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'

@Component({
  selector: 'app-warantypolicy',
  templateUrl: './warantypolicy.component.html',
  styleUrls: ['./warantypolicy.component.scss']
})
export class WarantypolicyComponent implements OnInit {

  warrantyPolicy:any = {}
  constructor(private policy:PolicysService) { }
  
  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "Warranty Policy"){
          this.warrantyPolicy = data
        }
      })
    })
  }

}
