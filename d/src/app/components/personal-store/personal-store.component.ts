import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-store',
  templateUrl: './personal-store.component.html',
  styleUrls: ['./personal-store.component.scss']
})
export class PersonalStoreComponent implements OnInit {
  @Input()storeBG = "../../../assets/assets/product-VR 4.png";
  @Input()storeTitle = "Your Personalised Store";
  @Input()personalStore = [
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },

    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    {
      itemSrc:"../../../assets/assets/product-3.png",
      name:"shampoo"
    },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
