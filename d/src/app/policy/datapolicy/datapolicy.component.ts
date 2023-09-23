import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PolicysService } from 'src/app/services/policys.service'
@Component({
  selector: 'app-datapolicy',
  templateUrl: './datapolicy.component.html',
  styleUrls: ['./datapolicy.component.scss']
})
export class DatapolicyComponent implements OnInit {

  dataPolicy:any = {}
  constructor(private policy:PolicysService) { }

  ngAfterViewInit(){
    // window.scroll(0,0)
  }
  ngOnInit(): void {
    let privacy = this.policy.getPolicy()
    privacy.subscribe((data:any)=>{
      let privacyArray = data.data
      privacyArray.filter((data:any)=>{
        if(data.title == "Data Policy"){
          this.dataPolicy = data
        }
      })
    })
  }

}
