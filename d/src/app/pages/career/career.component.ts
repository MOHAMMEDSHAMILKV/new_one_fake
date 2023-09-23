import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showDiv:boolean=false
  showHome:boolean=true
  activeIndex: number = -1;
  items: any[] = [0,1,2,3,4];
  isActive:boolean=false
  FileName: string = '';

 showDivv(){
  this.showDiv=true
  this.isActive = !this.isActive;
  this.showHome=false
  
  
 }
 
  setActiveIndex(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
    console.log(this.activeIndex);
    
  }
  resumeFileInputChange(event: any) {
    const resumeInput = event.target;
    if (resumeInput.files.length > 0) {
      this.FileName = resumeInput.files[0].name;
    } else {
      this.FileName = '';
    }
   
    
  }



}
