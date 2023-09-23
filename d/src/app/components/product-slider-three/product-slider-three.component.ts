import { Component, Input, OnInit, Output} from '@angular/core';
import { Product, ProductReal, ProductRealChild } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-slider-three',
  templateUrl: './product-slider-three.component.html',
  styleUrls: ['./product-slider-three.component.scss']
})
export class ProductSliderThreeComponent implements OnInit {
  dummyProduct:any = []
  @Input() sectionTitle = "Best Product";
  @Input() currency = "AED"
  @Input() products: ProductRealChild[] = []
  cartList: any
  cartProductImage:any=[
    {"image1":"../../../assets/products/prod1.svg"},
    {"image1":"../../../assets/products/prod2.svg"},
    {"image1":"../../../assets/products/prod3.svg"},
    {"image1":"../../../assets/products/prod4.svg"},
  ]
  constructor(private product:ProductService,private messageService: MessengerService, private cart: CartService, private wishList: WishlistService) {

  }

  ngOnInit(): void {
    // this.dummyProduct = this.product.getDummyProduct()
    // console.log(this.dummyProduct,"++");
    
  }
  // Add To Cart
  addCart(prod: any) {
    let qty = 12
    this.cart.addToCart(prod,qty)
  }
  addWishList(product: any) {
    this.wishList.addToWishList(product.id)
    this.messageService.RequestAddToWishList(product)
  }
  isWishlisted(productId: number) {
    // const productExists = this.wishList.getWishList().find((d) => d.id === productId);
    // if (productExists) return true
    // else 
    return false
  }
}
