import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch-banner',
  templateUrl: './branch-banner.component.html',
  styleUrls: ['./branch-banner.component.scss']
})
export class BranchBannerComponent implements OnInit {
  @Input()search = true
  productList=[
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    {
      productImg:"../../../assets/assets/fruit-1.png",
      productName:"Fruits",
      feature:"Farm fresh",
      typeCount:39,
    },
    
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
