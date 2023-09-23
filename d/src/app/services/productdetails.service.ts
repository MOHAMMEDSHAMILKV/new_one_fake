import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  api_inventory = environment.api_inventory
  productDetails = "/display/single-variant-detials/"
  createReview = "/rating-review/craete-review"
  createReport = "/rating-review/create-report"
  similarProduct = "/display/related-products-for-single_page/"

  constructor(private Http:HttpClient) { }
  getProductDetails(id:any){
    return this.Http.get<any>(this.api_inventory + this.productDetails +id)
  }
  createReviewPost(data:any){
    this.Http.post(this.api_inventory+this.createReview,data).toPromise().then((data:any)=>{
    })
  }
  createReportPost(data:any){
    this.Http.post(this.api_inventory+this.createReport,data).toPromise().then((data:any)=>{
    })
  }
  getSimilarProduct(id:any){
    return this.Http.get<any>(this.api_inventory + this.similarProduct +id)
  }
}
