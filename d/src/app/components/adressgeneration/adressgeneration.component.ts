import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-adressgeneration',
  templateUrl: './adressgeneration.component.html',
  styleUrls: ['./adressgeneration.component.scss']
})
export class AdressgenerationComponent implements OnInit {
  picUpAddress_isActive=false
  address_type:any=null
  country:any=[]
  nationality:any=null
  stateArray:any=[]
  state:any=null
  city:any=null
  full_name:any=null
  contact:any=null
  street_name:any=null
  building_name:any=null
  landmark:any=null
  instructions:any=null
  instructionsTextarea:any
  address_tag:any=null
  conditionDetail:any
  otpDisplay=false
  btn_Active=false
  public btnActiveOne:boolean=false
  public btnActiveTwo:boolean=false
  public btnActiveThree:boolean=false
  addressList:any=[]
  addressListEdit:any=[]
  addressotp:any 
  home=false
  office=false
  custom=false 
  addressId:any
  updateBtnActive=false
  updateBtnActiveOtp=false
  @Input() editAddressIsacctive:any
  @Input()  AddressData!:Address
  constructor(private route:ActivatedRoute,
    private auth:AuthService,
    private toastr:ToastrService,
    private msg:MessengerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      if(data.name=="delivery"){
          this.picUpAddress_isActive=false
      }else{
          this.picUpAddress_isActive=true
      } 
    }) 
    this.auth.getCountryNew().subscribe((data:any)=>{
      this.country= data.data
    }) 
    this.auth.getUserProfile().subscribe((data:any)=>{
      
    }) 
    this.auth.getAddressList().subscribe((data:any)=>{
      this.addressList=data.data?.results
    }) 
    this.msg.getRefreshData().subscribe((data:any)=>{
      this.auth.getAddressList().subscribe((data:any)=>{
        this.addressList=data.data?.results
      }) 
    })
    if(this.AddressData!=undefined){
      this.auth.getStateList(this.AddressData.country).subscribe((data:any)=>{
        this.stateArray=data.data
       })
    }
  }

  locationTag(e:any){
    this.address_tag=e
  }

  instructionsSelection(e:any,condition:any){
     this.instructions=e
     if(condition=="btnactiveone"){
        this.btnActiveOne=true
        this.btnActiveTwo=false
        this.btnActiveThree=false
     }else if(condition=="btnactivetwo"){
        this.btnActiveOne=false
        this.btnActiveTwo=true
        this.btnActiveThree=false
     }else if(condition=="btnactivethree"){
        this.btnActiveOne=false
        this.btnActiveTwo=false
        this.btnActiveThree=true
     }
  }  

  selectionInst(condition:any){
    if(condition=="Avoid ringing bell"){
      this.btnActiveOne=true
      this.btnActiveTwo=false
      this.btnActiveThree=false
   }else if(condition=="Hand over to security"){
      this.btnActiveOne=false
      this.btnActiveTwo=true
      this.btnActiveThree=false
   }else if(condition=="Leave at the door"){
      this.btnActiveOne=false
      this.btnActiveTwo=false
      this.btnActiveThree=true
   }
  }

  textareachange(data:any){
      this.instructions=this.instructionsTextarea
      if(data=='btnactivefour'){
        this.btnActiveOne=false
        this.btnActiveTwo=false
        this.btnActiveThree=false
      }
  }

  addresCreate(){
    // if(this.nationality!=null&&this.state!=null&&this.city!=null
    //   &&this.full_name!=null&&this.contact!=null&&this.street_name!=null
    //   &&this.building_name!=null&&this.landmark!=null&&this.instructions!=null
    //   &&this.address_tag!=null){

    // }else{
    //   this.toastr.warning("make sure all felid are filled ")
    // }
    let address={
      address_type:"billing_address",
      country:this.nationality,
      state:this.state,
      city:this.city, 
      full_name:this.full_name,
      contact: '+91'+this.contact,
      street_name:this.street_name,
      building_name:this.building_name,
      landmark:this.landmark,
      instructions:this.instructions,
      address_tag:this.address_tag 
    } 
    this.auth.createAddress(address)
    this.msg.getOtp().subscribe((d:any)=>{
      if(d=="success"){
        this.otpDisplay=true
      }
    })
    
  }

  stateChange(e:any){
    this.state=e.target.value
  }

  countryChange(e:any){
    this.nationality=e.target.value
    this.auth.getStateList(this.nationality).subscribe((data:any)=>{
     this.stateArray=data.data
    })
  }


  addresVarification(){
      let address={
        address_type:"billing_address",
        country:this.nationality,
        state:this.state,
        city:this.city,
        full_name:this.full_name,
        contact: '+91'+this.contact,
        street_name:this.street_name,
        building_name:this.building_name,
        landmark:this.landmark,
        instructions:this.instructions,
        address_tag:this.address_tag ,
        otp:this.addressotp
      } 
      this.auth.createAddress(address)
  }


  onOtpChange(e:any){
    this.addressotp=e
    this.btn_Active=this.addressotp.length==5?true:false
  }

  edit(id:any){
     this.addressListEdit=this.addressList.filter((d:any)=>d.id==id)
     this.updateBtnActive=true
     this.updateBtnActiveOtp=true
     for(let i of this.addressListEdit){
       this.addressId=i.id,
        this.nationality =i.country,
        this.state=i.state,
        this.city=i.city,
        this.full_name=i.full_name,
        this.contact= i.phone_number,
        this.street_name=i.street_name,
        this.building_name=i.building_name,
        this.landmark=i.landmark,
        this.instructions=i.instructions,
        this.instructionsTextarea=i.instructions,
        this.address_tag=i.address_tag
        this.selectionInst(this.instructions)
     }
     if(this.address_tag=="Office"||this.address_tag=="office"){
       this.office=true
     }
     if(this.address_tag=="Custom"||this.address_tag=="custom"){
       this.custom=true
     }
     if(this.address_tag=="Home"||this.address_tag=="home"){
       this.home=true
     }
  }

  updateAddress(id:any){
    let address={
      address_type:"billing_address",
      country:this.AddressData.country,
      state:this.AddressData.state,
      city:this.AddressData.city,
      full_name:this.AddressData.full_name,
      contact: '+91'+this.AddressData.contact,
      street_name:this.AddressData.street_name,
      building_name:this.AddressData.building_name,
      landmark:this.AddressData.landmark,
      instructions:this.instructions,
      address_tag:this.address_tag 
    } 
    this.auth.updateSidraAddress(id,address)
    this.msg.getOtp().subscribe((d:any)=>{
      if(d=="success"){
        this.otpDisplay=true 
      } 
    })
  }

  UpdateaddresVarification(){
    let address={
      address_type:"billing_address",
      country:this.nationality,
      state:this.state,
      city:this.city,
      full_name:this.full_name,
      contact: '+91'+this.contact,
      street_name:this.street_name,
      building_name:this.building_name,
      landmark:this.landmark,
      instructions:this.instructions,
      address_tag:this.address_tag ,
      otp:this.addressotp,
      key:this.addressotp
    } 
    this.auth.updateSidraAddress(this.addressId,address)
}

default(address_id:any){
  let address:any={
    address_id:address_id
  }
  this.auth.makeUsDefaullt(address)
}

deleteAddress(id:any){
  this.auth.deleteSidraAddress(id)
}



}
