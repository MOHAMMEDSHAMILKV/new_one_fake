import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  constructor(private http:HttpClient,
              private route:ActivatedRoute,
              private order:OrderService,
              private msg:MessengerService) { }
  imageArray:any=[]
  productRoute:any
  imageShow:any
  imageIdArray:any=[]
  orderDetail:any
  payment_mode:any=""
  reasonData:any=""
  customer_notes:any=""
  checkingOption="return"
  bankNum:any
  ibanNum:any 
  holderName:any
  bankArray:any=[]
  is_bank_detail=false
  is_bank_select:any
  bankDetailID:any
  ngOnInit(): void {
    this.productRoute ={
      id: this.route.snapshot.params['id'],
    } 
      this.order.singleDetails(this.productRoute.id).subscribe((data:any)=>{
      this.orderDetail=data.data.results[0]
    }) 
    this.order.getBankDetails().subscribe((d:any)=>{
      this.bankArray=d.data 
    }) 
  }

  imageUpload(event:any,type:any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const profilepic = <File>event.target.files[0]
      const fd = new FormData();
      const name=event.target.value
      fd.append('upload',profilepic,profilepic.name)
      const imageData={
        upload:fd,
      }
      this.http.post('https://api-uat-user.sidrabazar.com/file-upload',fd).toPromise().then((d:any)=>{
        this.imageIdArray.push(d?.data?.id)
        let image={
          image:d?.data?.upload
        }
        this.imageArray.push(image)
      })
    }
  }
  splice(i:any){
    this.imageArray.splice(i,1)
    this.imageIdArray.splice(i,1)
  }

  payment_mode_data(data:any){
    if(data=="wallet"){
      this.payment_mode="wallet"
    }
    if(data=="bank"){
      this.payment_mode="bank"
    }
  }

  continue(){
    if(this.payment_mode=="bank"){
      let retrun={
        reason: this.reasonData, 
        customer_notes:this.customer_notes,  
        orderline_id: this.orderDetail?.order_line_id,
        images:this.imageIdArray,
        process_type:this.checkingOption,
        payment_mode:this.payment_mode,
        reference_id:this.bankDetailID
       } 
       this.order.returnOrderandReplace(retrun) 
       this.msg.getStatus().subscribe((d:any)=>{
           if(d=='success'){
             this.reasonData=""
             this.customer_notes=""
             this.imageArray=[]
             this.payment_mode=""
           }
       })
    }
    if(this.payment_mode=="wallet"){
      let process_type:any
      let retrun={
       reason: this.reasonData, 
       customer_notes:this.customer_notes,  
       orderline_id: this.orderDetail?.order_line_id,
       images:this.imageIdArray,
       process_type:this.checkingOption,
       payment_mode:this.payment_mode
      } 
      this.order.returnOrderandReplace(retrun) 
    }
  }


  optionChecking(d:any){
    if(d=="return"){
      this.checkingOption="return"
    }
    if(d=="replace"){
      this.checkingOption="replace"
    }
  }

  bankDetailAdd(){
      let bank={
        account_number:this.bankNum,
        iban_number:this.ibanNum,
        holder_name:this.holderName
      }
      this.order.bankAdding(bank)
  }

  bankList_active(d:any){
    if(d=="add"){
      this.is_bank_detail=false
    }
    if(d=="list"){
      this.is_bank_detail=true
    }
  }

  selectID(id:any,i:any){
    this.is_bank_select=i
    this.bankDetailID=id
  }

  


}
