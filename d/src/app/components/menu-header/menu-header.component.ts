import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import axios from 'axios';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';


@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  sidraHeader:any=[
    {"name":"Groceries"},
    {"name":"Bulk"},
    {"name":"Life Styles"},
    {"name":"My Offers"},
    {"name":"Seller Corner"},
    {"name":"Gift Cards"}
  ]
  dataKey:any='data'
  historyArray:any=[]
  ifHeaderActive=false
  allCategory:any=[]
  subIndex:any
  mainInex:any
  brandIndex:any
  groupIndex:any
  indexOf:any
  lat:any=0
  lng:any=0
  zoom = 20
  map!: google.maps.Map
  service!: google.maps.places.PlacesService;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
    mapTypeControl:false
  }
  markers:any =[]
  mapHeight = "100%"
  currentLocation = ""
  markerPosition:any 
  defaultAdress:any
  state:any
  isFullMap=true
  idHalfMapAddress=false
  full_name:any=''
  contact:any=''
  street_name:any=''
  building_name:any=''
  landmark:any=''
  instructions:any=null
  instructionsTextarea:any 
  nationality:any
  address_tag:any='Home'
  conditionDetail:any
  otpDisplay=false
  btn_Active=false
  city:any
  stateArray:any
  home=false
  office=false
  custom=false 
  public btnActiveOne:boolean=false
  public btnActiveTwo:boolean=false
  public btnActiveThree:boolean=false
  pincode = 0
  locationDetails:any
  locationSearchData:any
  searchData:any
  userAddress: string = ''
  userLatitude: any = ''
  userLongitude: any = ''
  locationAddressList:any
  street:any=""
  district:any=""
  country:any=""
  optionsOfLoc:any="default"
  updateBtnActiveOtp=false
  addressotp:any 
  addressId:any
  listAddressData=false
  addressList:any=[]
  addressListEdit:any=[]
  updateBtnActive=false
  editAddressIsacctive=false
  countryArray:any=[]
  specialGroups='groceries'
  subscribeTimer=20
  timeLeft = 20
  button_active=false
  instBox:any
  contry_code_list=environment.conutryList
  country_code:any="971"
  is_default=true
  segmentName:any=0
  userData:any=null
  isAllcategory=true
  isSubCategories=false
  isGroups=false
  segmentArray:any=[]
  allSubCategory:any=[]
  avaliableLocation=false
  wishlistName:any
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  constructor(private cart:CartService,private auth:AuthService,
    private router:Router,private http:HttpClient,private msg:MessengerService) { }

  ngOnInit(): void {
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
    this.cart.getAllCategory(this.specialGroups).subscribe((data:any)=>{
      this.allCategory=data.data
      this.cart.getAllSubcategory(this.specialGroups, this.allCategory[0].code).subscribe((d:any)=>{
        this.allSubCategory=d.data
      })
    }) 
    this.cart.getDefaultAddress().subscribe((d:any)=>{
      this.defaultAdress=d.data?.value
      this.locationAddressList={ 
        country:this.defaultAdress?.country,
        state:this.defaultAdress?.state, 
        district:this.defaultAdress?.city,
        street:this.defaultAdress?.street
      }
      this.msg.getOtp().subscribe((d:any)=>{
          this.avaliableLocation=d.data.value
          console.log(this.avaliableLocation);
      })
      this.userLatitude=parseFloat(this.defaultAdress?.latitude)
      this.userLongitude=parseFloat(this.defaultAdress?.longitude)
      this.markers=[]
      this.markers.push({
        position: {
          lat: this.userLatitude,
          lng: this.userLongitude
        }, 
        length:16,
        label: {
          color: 'red',
          text: this.currentLocation,
        },
        title: this.currentLocation + (this.markers.length + 3),
        options: { animation: google.maps.Animation.DROP },
      })
      this.markerPosition = { lat: this.userLatitude, lng: this.userLongitude };
      this.center={
        lat: this.userLatitude, 
        lng: this.userLongitude 
      }
      let data={
        country:this.locationAddressList?.country,
        state:this.locationAddressList?.state,
        city_or_town:this.locationAddressList?.street,
        location:this.locationAddressList?.street,
        longitude:this.userLatitude.toString(),
        latitude:this.userLongitude.toString()
      }
      this.auth.avaliableLocation(data)
      this.msg.getOtp().subscribe((d:any)=>{
        this.avaliableLocation=d.data.value
      })
    }) 
    this.auth.getAddressList().subscribe((data:any)=>{
      this.addressList=data.data?.results
    }) 
    this.msg.getRefreshData().subscribe((s:any)=>{
      this.auth.getAddressList().subscribe((data:any)=>{
        this.addressList=data.data?.results
      }) 
    }) 
    this.auth.getCountryNew().subscribe((data:any)=>{
      this.countryArray= data.data
    }) 
    this.cart.getSegmant().subscribe((d:any)=>{
      this.segmentArray=d.data?.results
      console.log(this.segmentArray,"&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*");
    }) 
  }
 
  allCate(){
    this.ifHeaderActive=true
    // this.segmentName=""
    this.cart.getAllCategory(this.specialGroups).subscribe((data:any)=>{
      this.allCategory=data.data
      this.subIndex=0
      this.groupIndex=0
    }) 
  }

  getSubCate(code:any,k:any){
     this.subIndex=k
      this.cart.getAllSubcategory(this.specialGroups,code).subscribe((d:any)=>{
        this.allSubCategory=d.data
      })
  }

  segmentClick(d:any,name:any){
    this.msg.sendSegments(name)
    this.specialGroups = name
    this.segmentName=d 
    this.router.navigate(['/'])
    this.cart.getAllCategory(this.specialGroups).subscribe((data:any)=>{
      this.allCategory=data.data
      this.subIndex=0
      this.groupIndex=0
    }) 
    // localStorage.setItem('specialGroup',this.specialGroups)
  }

  locationSearch(name:any){
    // const address = name;
    // const geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ address }, (results: any, status: any) => {
    //   if (status === 'OK' && results && results.length > 0) {
    //     const location = results[0].geometry.location;
    //     this.map.setCenter(location);
    //     this.map.setZoom(12);
    //     const markerOptions = {
    //       position: location,
    //       map: this.map,
    //       title: address
    //     };
    //     const marker = new google.maps.Marker(markerOptions);
    //   } else {
    //     console.error('Geocode was not successful for the following reason:', status);
    //   }
    // }); 
    //  this.auth.getDatasearchLoc(name)
    // this.auth.getDatasearchLoc(name).then((d:any)=>{
    // })
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }) 
    this.http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+name+"&key=AIzaSyDJavpenypIG-Kd1sTSUeEk6jyJ4NpsAFA").subscribe((d:any)=>{
      
    })
  
    
  }


  clickRoute(code:any,type:any,name:any){
    // alert("hi")
    
    this.router.navigate(['/productGroup/'+code+'_$_'+type+'_$_'+name+'_$_'+this.specialGroups])
    this.ifHeaderActive=false
  }

  segmentSelection(e:any){
    this.segmentName=e
  }

  full_map(){
    this.isFullMap=true
    this.idHalfMapAddress=false
  }

  onMapClick(event: any) {
    this.markers=[]
    this.markers.push({
      position: {
        lat: event.latLng?.lat(),
        lng: event.latLng?.lng(),
      }, 
      length:16,
      label: {
        color: 'red',
        text: this.currentLocation,
      },
      title: this.currentLocation + (this.markers.length + 3),
      options: { animation: google.maps.Animation.DROP },
    })

    this.markerPosition = { lat: event.latLng?.lat(), lng: event.latLng?.lng()};
    this.center={
      lat: event.latLng?.lat(), lng: event.latLng?.lng() 
    }
    this.AddressTaken(event.latLng?.lat(),event.latLng?.lng()) 
    
  }
  
  makeUsDefault(e:any){
    this.is_default=e.target.checked
  }

  getCurrentLocation() {
    this.optionsOfLoc="current"
    if (navigator.geolocation) {
      this.markers=[]
      navigator.geolocation.getCurrentPosition((position:any) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.markers.push({
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }, 
          length:16,
          label: {
            color: 'red',
            text: this.currentLocation,
          },
          title: this.currentLocation + (this.markers.length + 3),
          options: { animation: google.maps.Animation.DROP },
        })
        this.markerPosition = { lat: this.lat, lng: this.lng };
        this.center={
          lat: this.lat, lng: this.lng 
        }
        this.AddressTaken(this.lat,this.lng) 
      }); 
    }
  }

  


  instructionsSelection(condition:any){
    this.instructions=condition
    this.instBox=condition
 }  

  
locationTag(e:any){
  this.address_tag=e
}


handleAddressChange(address: any) {
  this.userAddress = address.formatted_address
  this.userLatitude = address.geometry.location.lat()
  this.userLongitude = address.geometry.location.lng()
  this.markers=[]
  this.markers.push({
    position: {
      lat: this.userLatitude,
      lng: this.userLongitude
    }, 
    length:16,
    label: {
      color: 'red',
      text: this.currentLocation,
    },
    title: this.currentLocation + (this.markers.length + 3),
    options: { animation: google.maps.Animation.DROP },
  })
  this.markerPosition = { lat: this.userLatitude, lng: this.userLongitude };
  this.center={
    lat: this.userLatitude, 
    lng: this.userLongitude 
  } 
  this.AddressTaken(this.userLatitude,this.userLongitude)
} 


AddressTaken(lat:any,lng:any){
  const geocoder = new google.maps.Geocoder();
  const latlng = {
    lat: lat,
    lng: lng 
  }; 
  geocoder.geocode({ location: latlng },(results:any, status:any)=>{
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          let country, state, district,street;
          for (const component of addressComponents) {
            const types = component.types;
            if (types.includes('country')) {
              country = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
              state = component.long_name;
            } else if (types.includes('administrative_area_level_3')) {
              district = component.long_name;
            }
            else if (types.includes('locality')) {
              street = component.long_name;
            }
          }
          this.locationAddressList={
            country:country,
            state:state,
            district:district,
            street:street
          }
          this.country=this.locationAddressList?.country
          this.state=this.locationAddressList?.state
          this.district=this.locationAddressList?.district
          this.street=this.locationAddressList?.street
          let data={
            country:this.locationAddressList?.country,
            state:this.locationAddressList?.state,
            city_or_town:this.locationAddressList?.street,
            location:this.locationAddressList?.street,
            longitude:lng.toString(),
            latitude:lat.toString()
          }
          this.auth.avaliableLocation(data)
          this.msg.getOtp().subscribe((d:any)=>{
              this.avaliableLocation=d.data.value
              console.log(this.avaliableLocation);
              
          })
        }
      }
  })
}


confirmLocations(){
  this.country=this.locationAddressList?.country
  this.state=this.locationAddressList?.state
  this.district=this.locationAddressList?.district
  this.street=this.locationAddressList?.street
  this.isFullMap=false
  this.idHalfMapAddress=true
}

onOtpChange(e:any){
  this.addressotp=e
  this.button_active=this.addressotp.length==5?true:false
}


reSendOtp(){
  let resend={
    contact:'+'+this.country_code+this.contact.replace(/\s/g, '')
  }
  this.auth.resendforaddress(resend)
  this.observableTimer()
  this.button_active=false
  this.otpDisplay=true
  this.msg.getOtpForAddressResend().subscribe((D:any)=>{
    if(D=='success'){
      this.otpDisplay=true
      this.listAddressData=true
      this.editAddressIsacctive=false
      this.idHalfMapAddress=false
      this.isFullMap=false
      this.observableTimer()
    }
  })
}

observableTimer() {
  const source = timer(1000,1000);
  const abc = source.subscribe(val => {
    if(val > this.timeLeft) return 
    this.subscribeTimer = this.timeLeft - val;
  });
}




addresVarification(){
  let address={
    address_type:"billing_address",
    country:this.country.toUpperCase(),
    state:this.state,
    city:this.district,
    full_name:this.full_name,
    contact: '+'+this.country_code+this.contact.replace(/\s/g, ''),
    street_name:this.street,
    building_name:this.building_name,
    landmark:this.landmark,
    instructions:this.instructions,
    address_tag:this.address_tag ,
    otp:this.addressotp,
    key:this.addressotp
  } 
  this.auth.createAddress(address)
  this.msg.getOtp().subscribe((d:any)=>{
    if(d.status=="success"){
      this.otpDisplay=false
      this.listAddressData=true
      this.editAddressIsacctive=false
      this.idHalfMapAddress=false
      this.isFullMap=false
    } 
  })
}


UpdateaddresVarification(){
  let address={
    address_type:"billing_address",
    country:this.country.toUpperCase(),
    state:this.state,
    city:this.city,
    full_name:this.full_name,
    contact: '+'+this.country_code+this.contact.replace(/\s/g, ''),
    street_name:this.street,
    building_name:this.building_name,
    landmark:this.landmark,
    instructions:this.instructions,
    address_tag:this.address_tag ,
    otp:this.addressotp,
    key:this.addressotp
  } 
  this.auth.updateSidraAddress(this.addressId,address)
  this.msg.getOtp().subscribe((d:any)=>{
    if(d=="success"){
      this.listAddressData=true
      this.editAddressIsacctive=false
      this.idHalfMapAddress=false
      this.isFullMap=false
    }
    // const modal = document.getElementById('location_address');
    // if (modal) {
    //   modal.style.display = 'none';
    // }
    // setTimeout(() => {
    //   this.msg.dontRefresh()
    // }, 500);
  })
} 

updateAddress(){
  let address={
    address_type:"billing_address",
    country:this.country,
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
      this.listAddressData=true
      this.editAddressIsacctive=false
      this.idHalfMapAddress=false
      this.isFullMap=false
    }
  })
}

edit(id:any){
  this.addressListEdit=this.addressList.filter((d:any)=>d.id==id)
  this.editAddressIsacctive=true
  this.listAddressData=false
  this.isFullMap=false
  this.idHalfMapAddress=false
  this.updateBtnActive=true
  this.updateBtnActiveOtp=true
  this.auth.getStateList(this.addressListEdit[0].country).subscribe((data:any)=>{
    this.stateArray=data.data
  })
  for(let i of this.addressListEdit){
    this.addressId=i.id,
     this.country =i.country,
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


deleteAddress(id:any){
  this.auth.deleteSidraAddress(id)
}

countryChange(e:any){
  this.nationality=e.target.value
  this.auth.getStateList(this.nationality).subscribe((data:any)=>{
   this.stateArray=data.data
  })
}

stateChange(e:any){
  this.state=e.target.value
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
    country:this.country.toUpperCase(),
    state:this.state,
    city:this.district, 
    full_name:this.full_name,
    contact: '+'+this.country_code+this.contact.replace(/\s/g, ''),
    street_name:this.street,
    building_name:this.building_name,
    landmark:this.landmark,
    instructions:this.instructions,
    address_tag:this.address_tag 
  } 
  this.auth.createAddress(address)
  // this.msg.getaddressmodalclose().subscribe((data: any) => {
  //   this.otpDisplay = false
  // })
  this.msg.getOtp().subscribe((d:any)=>{
    if(d.message=="OTP send sucessfully.."){
      this.observableTimer()
      this.otpDisplay=true
      this.listAddressData=true
      this.editAddressIsacctive=false
      this.idHalfMapAddress=false
      this.isFullMap=false
    } 
  })
}

listAddress(e:any){
  if(e=='map'){
    this.listAddressData=false
    this.isFullMap=true
    this.idHalfMapAddress=false
    this.editAddressIsacctive=false
  }
  if(e=='list'){
    this.listAddressData=true
    this.isFullMap=false
    this.idHalfMapAddress=false
    this.editAddressIsacctive=false
  }
  if(e=='backList'){
    this.listAddressData=true
    this.isFullMap=false
    this.idHalfMapAddress=false
    this.editAddressIsacctive=false
  }

  if(e=='BackLoca'){
    this.listAddressData=false
    this.isFullMap=true
    this.idHalfMapAddress=false
    this.editAddressIsacctive=false
  }

  if(e=='backNewAddress'){
    this.listAddressData=false
    this.isFullMap=false
    this.idHalfMapAddress=true
    this.editAddressIsacctive=false
  }

}

default(address_id:any){
  let address:any={
    address_id:address_id
  }

  this.auth.makeUsDefaullt(address)
}




wishListRouting(d:any){
    let key="null"
    if(d=="wishlist"){
      this.router.navigate(['/wishlist/'+key])
    }else{
      this.router.navigate(['/offer'])
    }
    this.segmentName=null
    this.wishlistName=d
    // this.segmentName=""
}


textareachange(){
  this.instructions=this.instructionsTextarea
  this.instBox=""
}

all_category__main(){
  this.ifHeaderActive=false
  this.isAllcategory=true
  this.isSubCategories=false
  this.isGroups=false
}


onCategoryClick(code:any,index: number) {
  console.log("code",code);
  console.log("i",index);
  
  
  this.subIndex = index;
  this.isAllcategory=false
  this.isSubCategories=true
  this.cart.getAllSubcategory(this.specialGroups,code).subscribe((d:any)=>{
    this.allSubCategory=d.data
    console.log("alalalalalalalala",this.allSubCategory);
    
  })

}

onSubCategoryClick(index: number) {
  console.log("d",index );
  
  this.subIndex = index;
  this.isSubCategories=false
  this.isGroups=true
}


getGroups() {
  return this.allSubCategory[this.subIndex]?.group || [];
  
}

getBrands() {
  return this.allSubCategory[this.subIndex]?.brands || [];
}

Back(){
  if(this.isSubCategories===true){
    this.isSubCategories=false
    this.isAllcategory=true
  }else if(this.isGroups===true){
    this.isAllcategory=false
    this.isGroups=false
    this.isSubCategories=true
  }
}

}

