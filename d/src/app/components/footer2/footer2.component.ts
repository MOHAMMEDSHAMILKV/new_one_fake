import { Component, OnInit  } from '@angular/core';
@Component({
  selector: 'app-footer2',
  templateUrl: './footer2.component.html',
  styleUrls: ['./footer2.component.scss']
})
export class Footer2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  linkClick(name:any){
    if(name=="insta"){
      window.open('https://www.instagram.com/sidrabazar', '_blank');
    }
    if(name=="twitter"){
      window.open('https://twitter.com/SidraBazar', '_blank');
    }
    if(name=="whatsapp"){
      window.open('https://api.whatsapp.com/send?phone=971504459003', '_blank');
    }
  }
}
