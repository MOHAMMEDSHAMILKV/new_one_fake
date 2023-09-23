import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-card-four',
  templateUrl: './product-card-four.component.html',
  styleUrls: ['./product-card-four.component.scss']
})
export class ProductCardFourComponent  {
  @Input() wishlist = false
  @Input() control = true
  @Input() products!: Product;
  @Input() wishListed = false
  @Output() cartEvent = new EventEmitter()
  @Output() wishEvent = new EventEmitter()
  @Output() isWishListEvent = new EventEmitter()
  @Input() product_slider_four:any=   
   {    
    name: "",
    image1: "",
   } 
   
  cartProductImage:any=[
    {"image1":"../../../assets/products/prod1.svg"},
    {"image1":"../../../assets/products/prod2.svg"},
    {"image1":"../../../assets/products/prod3.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod5.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
    {"image1":"../../../assets/products/prod5.svg"},
  ]
  constructor(
    private messageService: MessengerService
  ) { }

  ngOnInit(){
    
  }

  changeWishlist(product: any) {
    this.wishEvent.emit(product)
  } 

  addCart(prod: any) {
    this.cartEvent.emit(prod)
  }

  buyNow() {

  }

}
