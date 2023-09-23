import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss']
})
export class AddSliderComponent implements OnInit {
  @Input() addList = [
    { 
      image:'',
      alt:''
    },
  ]
  @Input() type=""
  type_value = ""
  type_5="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-5@m";
  type_4="uk-child-width-1-2 uk-child-width-1-2@s uk-child-width-1-4@m";
  type_3="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m"
  type_2="uk-child-width-1-1 uk-child-width-1-1@s uk-child-width-1-2@m"
  type_1="uk-child-width-1-1"

  oneAdd = true;
  twoAdd = true;
  fiveAdd = true;
  constructor() { }

  ngOnInit(): void {
    if(this.type == "1"){
      this.type_value = this.type_1
    }
    else if(this.type == "2"){
      this.type_value = this.type_2
    }
    else if(this.type == "3"){
      this.type_value = this.type_3
    }
    else if(this.type == "4"){
      this.type_value = this.type_4
    }
    else if(this.type == "5"){
      this.type_value = this.type_5
    }
  }

  
}
