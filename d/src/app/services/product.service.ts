import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductReal, ProductRealChild } from '../models/product';
import { PopularCategory } from '../models/popular-category';
import { PopularCategoryChild } from '../models/popular-category';
// import { Banner } from '../models/banner';
import { Personalstore } from '../models/personalstore';
import { PersonalStoreProduct } from '../models/personalstore';
import { Orderitem, OrderitemChild } from '../models/orderitem';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_design_layout = environment.api_design_layout
  api_inventroy = environment.api_inventory
  api_cart_checkout=environment.api_cart_checkout
  header_2 = "/design/list-blockalldivision/Home/Header_slot2"
  header_3 = "/design/list-slotblock/Home/Header_slot3/bulk"
  mainSlot_1 = "/design/list-slotblock/Home/Main_slot1/"  
  mainSlot_2 = "/design/list-slotblock/Home/Main_slot2/"
  mainSlot_3 = "/design/list-slotblock/Home/Main_slot3/"
  mainSlot_4 = "/design/list-slotblock/Home/Main_slot4/"
  mainSlot_5 = "/design/list-slotblock/Home/Main_slot5/"
  center_slot = "/design/list-slotblock/Home/central_slot/"
  mainSlot_6 = "/design/list-slotblock/Home/Main_slot6/"
  mainSlot_7 = "/design/list-slotblock/Home/Main_slot7/"
  mainSlot_8 = "/design/list-slotblock/Home/Main_slot8/"
  mainSlot_9 = "/design/list-slotblock/Home/Main_slot9/"
  mainSlot_10 = "/design/list-slotblock/Home/Main_slot10/"
  linkedItem="/inventory-product/list-linkitem-by-item-display/"
  relatedItems="https://api-inventory-uat.ahlancart.com/display/related-products/"
  recomandedProductDetailPage = "/design/rec?user_id="
  designLayoutData="/design/list-slotblock/"
  getSeller="/display/get-seller-details/"
  deliveryTime="/order/check-delivery"
  // divisionMenuList = "design/list-slotblock/1/Header%20slot2"

 
  order_list: Orderitem = {
    id:1,
    order_id:23,
    status:"Ordered",
    data: [
      new OrderitemChild(1,25,"Apple Teeshirt for kids","../../../assets/assets/appleteeshirt.jpeg","souq rawabi","../../../assets/assets/express.svg",2,230),
      new OrderitemChild(2,25,"Apple Teeshirt for kids","../../../assets/assets/appleteeshirt.jpeg","souq rawabi","../../../assets/assets/express.svg",2,330),
      new OrderitemChild(3,25,"Apple Teeshirt for kids","../../../assets/assets/appleteeshirt.jpeg","souq rawabi","../../../assets/assets/express.svg",2,430),
    ]
  }



  // main_slot_3: ProductReal = {
  //   display_name: "Main Slot 3",
  //   data: [
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple","Canon EOS 3000D DSLR Camera 1 Camera Body, 18 - 55 mm Lens","https://rukminim1.flixcart.com/image/312/312/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple","Apple 1Kg","https://www.jiomart.com/images/product/600x600/590004487/apple-indian-6-pcs-pack-0-20200806.jpg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"juice","Fresh Juice","https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/vfpglyuxqk2udtxmfhlc"),
  //   ]
  // }

  // main_slot_4: ProductReal = {
  //   display_name: "Main Slot 4",
  //   data: [
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //   ]
  // }

  // main_slot_6: ProductReal = {
  //   display_name: "Main Slot 6",
  //   data: [
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //   ]
  // }

  // main_slot_8: ProductReal = {
  //   display_name: "Main Slot 8",
  //   data: [
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //     new ProductRealChild (12,230,true,210,"dewali",0,true,5,1,12,'kilogram',2,"Apple Teeshirt for kids","Apple Tee Shirt for men","../../../assets/assets/appleteeshirt.jpeg"),
  //   ]
  // }

  products: Product[] = [
    new Product(123, 20, 'Apple', '../../../assets/products/product_1.png', 2.5, 1199.00, 4299.00, '19:34:30', 'hrs'),
    new Product(1203, 40, 'Orange 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_2.png', 3.5, 2199.00, 4299.00, '19:34:30', 'hrs'), 
    new Product(103, 10, 'Apple 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_3.png', 4.3, 3199.00, 4299.00, '19:34:30', 'hrs'), 
    new Product(12213, 24, 'Orange 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_4.png', 3.5, 4199.00, 4299.00, '19:34:30', 'hrs'), 
    new Product(12543, 26, 'Grapes 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_5.png', 5.0, 5199.00, 4299.00, '19:34:30', 'hrs'), 
    new Product(1003, 22, 'Samsung 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_6.png', 4.3, 6199.00, 4299.00, '19:34:30', 'hrs'), 
    new Product(12093, 27, 'Banana 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_7.png', 4.2, 7199.00, 4299.00, '19:34:30', 'hrs'), 
    new Product(326, 0, 'Apple 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_8.png', 4.6, 199.00, 4299.00, '', 'hrs'),
    new Product(323, 0, 'Apple 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_8.png', 4.6, 199.00, 4299.00, '', 'hrs'),
    new Product(1023, 0, 'Orange 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_9.png', 4.5, 1199.00, 4299.00, '', 'hrs'),
    new Product(903, 0, 'Banana 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_10.png', 4.2, 2199.00, 4299.00, '', 'hrs'),
    new Product(1893, 0, 'Grapes 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_1.png', 4.2, 3199.00, 4299.00, '', 'hrs'),
    new Product(223, 0, 'Grapes 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_2.png', 4.1, 1199.00, 4299.00, '', 'hrs'),
    new Product(198, 0, 'Orange 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_4.png', 4.7, 2199.00, 4299.00, '', 'hrs'),
    new Product(930, 0, 'Samsung 6.5 kg Fully-Automatic Top Loading Washing Machine  A65A4002VS/TL', '../../../assets/products/product_3.png', 4.2, 6199.00, 4299.00, '', 'hrs'),
  ]


  // homeBanner: Banner[] = [
  //   new Banner(1, "../../../assets/assets/Banner2_.png", "banner", "category"),
  //   new Banner(2, "../../../assets/assets/Banner3_.png", "banner", "productgroup"),
  //   new Banner(3, "../../../assets/assets/Banner4_.png", "banner", "subcategory"),
  // ]
  popular_category: PopularCategory = {
    display_name: "popular category",
    data: [
      new PopularCategoryChild(1, "Fruits & vegetables", "../../../assets/Fruits & Vegitables/orange.png", 1,1,"category"),
    ]
  }


  personal_store: Personalstore = {
    storeBG: "../../../assets/assets/product-VR 4.png",
    storeTitle: "Your Personalised Store",
    personalStore: [
      new PersonalStoreProduct(1,"../../../assets/assets/fridge.png","shampoo1"),
      new PersonalStoreProduct(2, "../../../assets/assets/product-3.png", "shampoo2"),
      new PersonalStoreProduct(3,"../../../assets/assets/product-3.png","shampoo3"),
      new PersonalStoreProduct(4, "../../../assets/assets/product-3.png", "shampoo4"),
      new PersonalStoreProduct(5, "../../../assets/assets/product-3.png", "shampoo5"),
      new PersonalStoreProduct(6, "../../../assets/assets/product-3.png", "shampoo6"),
      new PersonalStoreProduct(7, "../../../assets/assets/product-3.png", "shampoo"),
      new PersonalStoreProduct(8, "../../../assets/assets/product-3.png", "shampoo"),
      new PersonalStoreProduct(9, "../../../assets/assets/product-3.png", "shampoo"),
      new PersonalStoreProduct(10, "../../../assets/assets/product-3.png", "shampoo"),
      new PersonalStoreProduct(11, "../../../assets/assets/product-3.png", "shampoo"),
      new PersonalStoreProduct(12, "../../../assets/assets/product-3.png", "shampoo"),
    ]
  }
  
  constructor(private Http:HttpClient,private toaster: ToastrService,) {
    
  }

  CheckdeliveryTime(data:any){
      this.Http.post(this.api_cart_checkout+this.deliveryTime,data).toPromise().then((data:any)=>{
        if(data.status === 'success'){
          // this.toaster.success(data.message)
          
        }else{
          // this.toaster.warning(data.message)
        }
      })
  }

  // getSellerDetails(id:any){
  //   return this.Http.get<any>(this.api_inventroy+this.getSeller+id)
  // }
  // getDeals(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_2+type)
  // }
  // getPopularCategory(type:any) {
  //   // return this.Http.get<any>(this.api_design_layout + this.popularCategoryApi)
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_1+type)
  //   // return this.popular_category;
  // }  
  // getDivisionList(type:any){
  //   // return this.Http.get<any>(this.api_design_layout+this.bannerHomeApi)
  //   // return this.homeBanner
  //   return this.Http.get<any>(this.api_design_layout+this.header_2)
  // }
  // getHomeBanner(){
  //   // return this.Http.get<any>(this.api_design_layout+this.bannerHomeApi)
  //   // return this.homeBanner
  //   return this.Http.get<any>(this.api_design_layout+this.header_3)
  // }
  // getHomeMainSlotOne(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_1+type)
  // }
  // getHomeMainSlotTwo(type:any) {
  //   // return this.Http.get<any>(this.api_design_layout + this.popularCategoryApi)
  //   return this.Http.get<any>(this.mainSlot_2+type)
  //   // return this.popular_category;
  // }
  // getHomeMainSlotThree(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_3+type)
  //   // return this.main_slot_3
  // }
  // getHomeMainSlotFour(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_4+type)
  //   // return this.main_slot_4
  // }

  // getHomeMainSlotFive(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_5+type)
  //   // return this.main_slot_4
  // }

  // getHomeMainSlotSix(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_6+type)
  //   // return this.main_slot_6
  // }
  // getHomeCenterSlot(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.center_slot+type)
  // }

  // getHomeMainSlotSeven(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_7+type)
  //   // return this.main_slot_4
  // }
  
  // getHomeMainSlotEight(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_8+type)
  //   // return this.main_slot_8
  // }
  // getHomeMainSlotNine(type:any){
  //   return this.Http.get<any>(this.api_design_layout+this.mainSlot_9+type)
  // }

  // getHomeMainSlotTen(type:any,user:any){
  //   if(user){
  //     return this.Http.get<any>(this.api_design_layout+this.mainSlot_10+type+'?user_id='+user)
  //   }else{
  //     return this.Http.get<any>(this.api_design_layout+this.mainSlot_10+type)
  //   }
  // }

  // getRecomandedOne(user:any){
  //   return this.Http.get<any>(this.api_design_layout+this.recomandedProductDetailPage+user)
  // }

  // getProductGroup(name:any,categoryName:any){
  //   return this.Http.get<any>(this.api_design_layout+this.designLayoutData+name+"/Main_slot1/"+categoryName)
  // }

  getProducts(): Product[] {
    // TODO: Populate from an API and return an Observable
    return this.products
  }
  getPersonalStore(){
    return this.personal_store
  }

  getOrderList(){
    return this.order_list
  }
 
  // getProductsDemo(): Observable<Product[]> {
    // TODO: Populate from an API and return an Observable
    // return this.products
    // return this.Http.get<Product[]>(this.api_design_layout);
  // }
  
  getLinkedItem(id:any){
     return this.Http.get<any>(this.api_inventroy+this.linkedItem+id)
  }

  getRelatedItem(id:any){
    return this.Http.get<any>(this.relatedItems+id)
 }
}
