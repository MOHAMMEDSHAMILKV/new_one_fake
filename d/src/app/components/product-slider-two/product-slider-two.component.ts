import { Component, Input, OnInit, Output} from '@angular/core';
import { ProductRealChild } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-slider-two',
  templateUrl: './product-slider-two.component.html',
  styleUrls: ['./product-slider-two.component.scss']
})
export class ProductSliderTwoComponent implements OnInit {

  @Input() sectionTitle="Best Product";
  @Input() currency="AED"
  @Input() products:ProductRealChild[] = []
  @Input() reload = false
  cartList:any
  constructor(private messageService:MessengerService, 
    private cart: CartService, 
    private wishList:WishlistService  ) { 
    
  }

  ngOnInit(): void {
    // console.log(products);
    
  }
  // Add To Cart
  addCart(prod:any){
    // this.messageService.requestAddToCart(prod)
  }
  addWishList(product:any){
    this.messageService.RequestAddToWishList(product)
  }
  isWishlisted(productId:number){
    // const productExists = this.wishList.getWishList().find((d) => d.id === productId);
    // if(productExists) return true
    // else 
    return false
  }

}
