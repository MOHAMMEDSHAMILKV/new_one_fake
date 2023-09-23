import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { jsPDF } from "jspdf";
import  html2canvas from "html2canvas";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ProductdetailsService } from 'src/app/services/productdetails.service';
import { RatingreviewService } from 'src/app/services/ratingreview.service';
@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  headline = ""
  imageArray:any = [
    {
      image:"",
      image1:""
    },
    {
      image:"",
      image1:""
    },
    {
      image:"",
      image1:""
    },
  ]
  reviewComment = ""
  review:any = []
  cancelForm!: FormGroup;
  reviewForm!: FormGroup
  returnForm!: FormGroup;
  reportForm!: FormGroup
  printReceipt = new jsPDF();
  currency="AED"
  step= 3
  orderList:any = []
  selectedImage = "../../../assets/assets/placeholderimage.png"
  @Input() orderline_id!: 9
  @Input() amount!: 206415
  @Input() cart_id!: 39
  @Input() delivery_partner!: ""
  @Input() expected_date!: "12-12-2020"
  @Input() image!: "../../../assets/assets/placeholderimage.png"
  @Input() is_returable!: true
  @Input() name!: "sample  5"
  @Input() order_id!: 12
  @Input() sku_id!: 6
  @Input() status!: ""
  @Input() total_quantity!: 11
  @Input() variant_id = 0
  constructor(private _reviewService:RatingreviewService,private _productService:ProductService, private order:OrderService, private productDetails:ProductdetailsService) { }

  ngOnInit(): void {
    this.cancelForm = new FormGroup({
      resone: new FormControl('',[Validators.required]),
      note: new FormControl('',[Validators.required]),
    })
    this.reviewForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      review: new FormControl('',[Validators.required]),
    })
    this.reportForm = new FormGroup({
      reason: new FormControl('',[Validators.required]),
    })
    this.returnForm = new FormGroup({
      resone: new FormControl('',[Validators.required]),
      note: new FormControl('',[Validators.required]),
    })
    this.orderList.push(this._productService.getOrderList())

  }
  downloadPdf(orderline_id:any){
    let data:any = document.getElementById('demo')
    html2canvas(data).then((canvas)=>{
      let imgData = canvas.toDataURL('image/png')
      let doc = new jsPDF()
      doc.addImage(imgData,10,10,200,100)
      doc.save("image.pdf")
    })
  }
  reportSubmit(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let report ={
      variant_id: data, 
      customer_id: userDetails.customer_id, 
      resone: this.reportForm.value.resone, 
      review_id:null
    }
    this.productDetails.createReportPost(report)
  }
  reviewSubmit(data:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let review ={
      variant_id: data, 
      customer_id: userDetails.customer_id, 
      title: this.reviewForm.value.title, 
      review: this.reviewForm.value.review, 
      image1: "", 
      image2: "", 
      image3:  "",
    }
    this.productDetails.createReviewPost(review)
  }
  onCancel(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)

    let cancel = {
      reason:this.cancelForm.value.resone,
      customer_notes:this.cancelForm.value.note,
      orderline_id:id,
      user_id:userDetails.customer_id
    }
    this.order.cancelOrder(cancel)
  }
  onReturn(id:any){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)

    let returnorder = {
      reason:this.cancelForm.value.resone,
      customer_notes:this.cancelForm.value.note,
      orderline_id:id,
      user_id:userDetails.customer_id
    }
    this.order.returnOrder(returnorder)
  }

  isDelivered(status:any){
    if(status === 'Delivered'){
      return true
    }else{
      return false
    }
  }
  isTrackable(status:any){
    if(status === 'initiated'){
      return true
    }
    else if(status === 'Shipment Started'){
      return false
    }
    else if(status === 'Out of Delivery'){
      return false
    }
    else if(status === 'Out of Delivery'){
      return false
    }
    else{
      return false
    }
  }

  

}
