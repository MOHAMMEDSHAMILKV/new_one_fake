import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() productDetails=false
  @Input() aditionInfo=false
  @Input() featuresSatus=false
  @Input() additional_discription = ""
  @Input() arabic_description = ""
  @Input() discription = ""
  @Input() additionalDetail = {
    key_values : [
      {
        key:"",
        value:""
      }
    ],
    name:""
  }
  @Input() incredient = {
    key_values : [
      {
        key:"",
        value:""
      }
    ],
    name:""
  }
  @Input() product_details = {
    key_values : [
      {
        key:"",
        value:""
      }
    ],
    name:""
  }
  @Input() features = {
    key_values : [
      {
        key:"",
        value:""
      }
    ],
    name:""
  }
  @Input() catelog:any = [
    {
      key: "",
      values: ""
    }
  ]
  @Input()languageShow=""
    constructor() { }

  ngOnInit(): void {
    let language:any = localStorage.getItem('languageName')
    this.languageShow = JSON.parse(language)
  }

}
