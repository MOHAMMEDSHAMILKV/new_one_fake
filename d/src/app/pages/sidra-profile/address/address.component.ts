import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  picUpAddress_isActive = false
  address_type: any = null
  country: any = []
  nationality: any = ""
  stateArray: any = []
  state: any = ""
  city: any = ""
  full_name: any = ""
  contact: any = ""
  street_name: any = ""
  building_name: any = ""
  landmark: any = null
  instructions: any = null
  instructionsTextarea: any
  address_tag: any = "Home"
  conditionDetail: any
  otpDisplay = false
  btn_Active = false
  public btnActiveOne: boolean = false
  public btnActiveTwo: boolean = false
  public btnActiveThree: boolean = false
  addressList: any = []
  addressListEdit: any = []
  addressotp: any = ""
  home = true
  office = false
  custom = false
  addressId: any
  updateBtnActive = false
  updateBtnActiveOtp = false
  searchData = ""
  searchDataArray: any = []
  pinArray: any = []
  subscribeTimer = 20
  timeLeft = 20
  button_active = false
  instBox: any
  is_default = true
  contry_code_list = environment.conutryList
  country_code: any = "971"
  IsmodelShowAddressCreate = false
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private toastr: ToastrService,
    private msg: MessengerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      if (data.name == "delivery") {
        this.picUpAddress_isActive = false
      } else {
        this.picUpAddress_isActive = true
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
    this.auth.getPickUpAddressList().subscribe((data:any)=>{
      this.pinArray=data.data.results
    })
    this.msg.getRefreshData().subscribe((data: any) => {
      this.auth.getPickUpAddressList().subscribe((data: any) => {
        this.pinArray = data.data.results
      })
    })
  }

  locationTag(e: any) {
    this.address_tag = e
  }

  instructionsSelection(condition: any) {
    this.instructions = condition
    this.instBox = condition
  }

  selectionInst(condition: any) {
    this.instBox = condition

  }

  textareachange() {
    this.instructions = this.instructionsTextarea
    this.instBox = ""
  }

  addresCreate() {
    let address = {
      address_type: "billing_address",
      country: this.nationality,
      state: this.state,
      city: this.city,
      full_name: this.full_name,
      contact: '+' + this.country_code + this.contact.replace(/\s/g, ''),
      street_name: this.street_name,
      building_name: this.building_name,
      landmark: this.landmark,
      instructions: this.instructions,
      address_tag: this.address_tag,
      default: this.is_default
    }
    this.auth.createAddress(address)
    this.msg.getaddressmodalclose().subscribe((data: any) => {
      this.otpDisplay = false
      const modal = document.getElementById('address-modal');
      if (modal) {
        modal.style.display = 'none';
      }
      setTimeout(() => {
        this.msg.dontRefresh()
      }, 500);
    })
    this.msg.getOtp().subscribe((d: any) => {
      if (d.status == "success") {
        this.otpDisplay = true
        this.observableTimer()
      }
    })
  }

  stateChange(e: any) {
    this.state = e.target.value
  }

  countryChange(e: any) {
    this.nationality = e.target.value
    this.auth.getStateList(this.nationality).subscribe((data: any) => {
      this.stateArray = data.data
    })
  }


  AddNew() {
    this.full_name = ""
    this.contact = ""
    this.building_name = ""
    this.street_name = ""
    this.city = ""
    this.landmark = ""
    this.nationality = ""
    this.state = ""
    this.instBox = ""
  }

  addresVarification() {
    let address = {
      address_type: "billing_address",
      country: this.nationality,
      state: this.state,
      city: this.city,
      full_name: this.full_name,
      contact: '+' + this.country_code + this.contact,
      street_name: this.street_name,
      building_name: this.building_name,
      landmark: this.landmark,
      instructions: this.instructions,
      address_tag: this.address_tag,
      otp: this.addressotp
    }
    this.auth.createAddress(address)
    // this.msg.getOtp().subscribe((d:any)=>{
    //   console.log("dddddddddd",d);

    //   if(d=="success"){
    //     this.IsmodelShowAddressCreate=false
    //     this.otpDisplay=false
    //   }
    // })
  }




  

  makeUsDefault(e:any){
    this.is_default=e.target.checked
  }


  onOtpChange(e:any){
    this.addressotp=e
    this.button_active=this.addressotp.length==5?true:false
  }

  edit(id:any){
     this.addressListEdit=this.addressList.filter((d:any)=>d.id==id)
     this.updateBtnActive=true
     this.updateBtnActiveOtp=true
     for(let i of this.addressListEdit){
       this.addressId=i.id,
        this.nationality=i.country,
        this.state=i.state,
        this.city=i.city,
        this.full_name=i.full_name,
        this.contact= i.phone_number.replace(/\s/g, ''),
        this.street_name=i.street_name,
        this.building_name=i.building_name,
        this.landmark=i.landmark,
        this.instructions=i.instructions,
        this.instructionsTextarea=i.instructions,
        this.address_tag=i.address_tag
        this.country_code=i.phone_number_code
        this.selectionInst(this.instructions)
        this.auth.getStateList(i.country).subscribe((data:any)=>{
          this.stateArray=data.data
        }) 
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

  updateAddress(){
    let address={
      address_type:"billing_address",
      country:this.nationality,
      state:this.state,
      city:this.city,
      full_name:this.full_name,
      contact: '+'+this.country_code+this.contact.replace(/\s/g, ''),
      street_name:this.street_name,
      building_name:this.building_name,
      landmark:this.landmark,
      instructions:this.instructions,
      address_tag:this.address_tag 
    } 
    this.auth.updateSidraAddress(this.addressId,address)
    this.msg.getOtp().subscribe((d:any)=>{
      if(d=="success"){
        this.otpDisplay=true
        this.observableTimer()

      }
    })
  }

  UpdateaddresVarification() {
    let address = {
      address_type: "billing_address",
      country: this.nationality,
      state: this.state,
      city: this.city,
      full_name: this.full_name,
      contact: '+' + this.country_code + this.contact.replace(/\s/g, ''),
      street_name: this.street_name,
      building_name: this.building_name,
      landmark: this.landmark,
      instructions: this.instructions,
      address_tag: this.address_tag,
      otp: this.addressotp,
      key: this.addressotp
    }
    this.auth.updateSidraAddress(this.addressId, address)
    this.msg.getOtp().subscribe((d: any) => {
      if (d == 'success') {
        this.otpDisplay = false
        this.IsmodelShowAddressCreate = true
      }
    })
  }




  observableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      if (val > this.timeLeft) return
      this.subscribeTimer = this.timeLeft - val;
    });
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

//searchFunvction...............
searchPicupAddress(d:any){
  
  if(d!=""){
    this.auth.searchPicUpaddress(d).subscribe((data:any)=>{
      this.searchDataArray=data.data.results
    }) 
  } else if(d==""){
    this.searchDataArray=[]
  }  

 
}

bookMark(id:any){
  let bookmark={
    pikup_id:id
  }
  this.auth.pickUpAddressBookMark(bookmark)
}



// reSendOtp(){
//   let resend={
//     contact:'+971'+this.contact
//   }
//   this.auth.resendforaddress(resend)
//   this.observableTimer()
//   this.button_active=false
//   this.otpDisplay=true
//   this.msg.getOtpForAddressResend().subscribe((D:any)=>{
//     if(D=='success'){
//       this.otpDisplay=true
//     }
//     this.auth.makeUsDefaullt(address)
//     console.log("let address",address)
//   }

//     if (d != "") {
//       this.auth.searchPicUpaddress(d).subscribe((data: any) => {
//         this.searchDataArray = data.data.results
//         console.log(this.searchDataArray);
//       })
//     } else if (d == "") {
//       this.searchDataArray = []
//       console.log(this.searchDataArray);

//     }


//   }



  unpin(id: any) {
    let bookmark = {
      pikup_id: id
    }
    this.auth.pickUpAddressBookMarkRemove(bookmark)
  }

  reSendOtp() {
    let resend = {
      contact: '+971' + this.contact
    }
    this.auth.resendforaddress(resend)
    this.observableTimer()
    this.button_active = false
    this.otpDisplay = true
    this.msg.getOtpForAddressResend().subscribe((D: any) => {
      if (D == 'success') {
        this.otpDisplay = true
      }
    })
  }

  open() {
    this.otpDisplay = true
  }

}
