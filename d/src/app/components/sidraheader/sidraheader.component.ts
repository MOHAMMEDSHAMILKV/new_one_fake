import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidraheader',
  templateUrl: './sidraheader.component.html',
  styleUrls: ['./sidraheader.component.scss']
})
export class SidraheaderComponent implements OnInit {
  showMenu=false
  showLangugeBox=false 
  searchData=""
  searchDataArray:any[]=[]
  searchDataFalseTrue:any=false
  historyTrueFalse=false
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
  is_checkout=false
  cartDataMain:any=[]
  profileData:any
  userData:any
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
  country:any
  state:any
  isFullMap=true
  idHalfMapAddress=true
  full_name:any=null
  contact:any=null
  street_name:any=null
  building_name:any=null
  landmark:any=null
  instructions:any=null
  instructionsTextarea:any 
  nationality:any
  address_tag:any=null
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
  isLoading=false
  updatedprofile:any
  constructor(private router:Router,
              private auth:AuthService,
              private cart:CartService,
              private msg:MessengerService) { }

  ngOnInit(): void { 
    let history:any =  localStorage.getItem(this.dataKey)
    this.historyArray = JSON.parse(history)
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
    if(this.userData!=null){
      // this.cart.getAllCategory().subscribe((data:any)=>{
      //   this.allCategory=data.data
      // }) 
      this.cart.getDefaultAddress().subscribe((d:any)=>{
        this.defaultAdress=d.data?.value 
      }) 
      let check=localStorage.getItem('checkout') 
      if(check=='isCheckoutActive'){
        this.is_checkout=true
      } 
      else{
        this.is_checkout=false
      }
      this.cart.getsidraCart().subscribe((data:any)=>{
        this.cartDataMain=data.data?.results
      })  
      this.auth.getUserProfile().subscribe((data:any)=>{
        this.profileData=data.data
        this.updatedprofile=data.data?.profile_pic
        if (!this.updatedprofile) {
          this.updatedprofile = '../../../assets/images/profile_dedualt_pic.svg' // Replace with your default profile picture URL
        }
        console.log("@@@!!!@@@!!!@@@!!!@@!!@@@!!",this.profileData);
        
      }) 
      this.msg.getWithoutRefresh().subscribe((data:any)=>{
        this.auth.getUserProfile().subscribe((data:any)=>{
          this.profileData=data.data
        }) 
      })
      this.msg.getCartCount().subscribe((d:any)=>{
      })
      this.msg.getRefreshData().subscribe((d:any)=>{
        this.cart.getsidraCart().subscribe((data:any)=>{
          this.cartDataMain=data.data?.results
        })  
      })
    }
    else{
      // this.cart.getAllCategory().subscribe((data:any)=>{
      //   this.allCategory=data.data
      // }) 
      this.cart.getDefaultAddress().subscribe((d:any)=>{
        this.defaultAdress=d.data?.value
      })
      
      let history:any =  localStorage.getItem('cartData')
      this.cartDataMain = JSON.parse(history) 
      this.msg.getRefreshData().subscribe((s:any)=>{
        let history:any =  localStorage.getItem('cartData')
        this.cartDataMain = JSON.parse(history)
      })
    }
  } 

  onCartNavigate(){ 
     this.router.navigate(['/cart'])
  }

  showOptions(){
      this.showMenu=!this.showMenu
      this.showLangugeBox=false      
  }

  showLanguage(){
    this.showLangugeBox=!this.showLangugeBox
    this.showMenu=false
  }
  

searchHistory:any = [];

query = '';



  async sidraheader(d:any){
    await this.auth.searchSugggestionForSidra(d).subscribe(async (data:any)=>{
        this.searchDataArray=  data.data;
        // const data1 = await data.json();
        // this.searchDataArray = data;
        if(this.searchDataArray!=undefined){
          this.searchDataFalseTrue=true 
          this.historyTrueFalse=false
        } 
    }) 
  } 

  changeHeader(){
    // this.searchDataFalseTrue=true 
   if(this.searchData==""&&this.historyArray!=null){
    this.historyTrueFalse=true
    this.searchDataFalseTrue=false
   }
    // this.searchData=="ttttttttttttttttttt" 
    // alert("working")
  }

 
logout(){
  localStorage.clear()
  this.isLoading = true;
  // this.toastr.success('Logout success')
  this.router.navigate(['/'])
  this.isLoading=true 
  setTimeout( () => { 
    window.location.reload()
    this.router.navigate(['/'])
    this.isLoading=false
  }, 1000);
}


searchResults(d:any,item:any){
  if(d!=""){
    let storedData:any=[]
    storedData = this.getData();
    let x:any={
      name:d
    }
    const exists = storedData.some((item:any) => item.name == d);
    if (!exists) {
      storedData.push(x);
    }
    
    localStorage.setItem(this.dataKey, JSON.stringify(storedData));
    let history:any =  localStorage.getItem(this.dataKey)
    this.historyArray = JSON.parse(history)
  }
  this.searchDataFalseTrue=false 
  this.historyTrueFalse=false 
  if(item==''){
    this.router.navigate(['/search/' + d+'_&_'+'search'+'_&_'+"''"])
  }else{
    this.router.navigate(['/search/' + d+'_&_'+'search'+'_&_'+item.group_type])
  }
}

addData(data: any) {
  let storedData:any = this.getData();
  let x:any={
    name:data
  } 
  storedData.push(x);
  localStorage.setItem(this.dataKey, JSON.stringify(storedData));
} 


getData() {
  let history:any =  localStorage.getItem(this.dataKey)
  this.historyArray = JSON.parse(history)
  if(this.historyArray==null){
    this.historyArray=[]
  } 
  // let storedData:any =localStorage.getItem (JSON.parse(this.dataKey));
  return this.historyArray; 
}

clearHistory(){
  localStorage.removeItem(this.dataKey) 
  this.historyTrueFalse=false
  let history:any =  localStorage.getItem(this.dataKey)
  this.historyArray = JSON.parse(history)
} 

// allCate(){
//   this.ifHeaderActive=true
//   this.cart.getAllCategory(this.s).subscribe((data:any)=>{
//     this.allCategory=data.data
//     this.subIndex=0
//     this.groupIndex=0
//   }) 
// }

clickRoute(code:any,type:any,name:any){
  // alert("hi")
  this.router.navigate(['/productGroup/'+code+'_$_'+type+'_$_'+name])
  this.ifHeaderActive=false
}

OnclickOutside(){
  this.searchDataFalseTrue=false
}

getCurrentLocation() {
  if (navigator.geolocation) {
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
      const geocoder = new google.maps.Geocoder();
      this.geocodeAddress1("Ajman")
      // geocoder.geocode({ location: { lat: this.lat, lng: this.lng }}).then((results:any, status:any)=>{
      //   if (status === "OK") {
      //     // Get the country and state from the address components
      //     const address_components = results[0].address_components;
      //     const country = address_components.find((component:any) => component.types.includes("country")).long_name;
      //     const state = address_components.find((component:any) => component.types.includes("administrative_area_level_1")).long_name;
      //     // Do something with the country and state
      //     console.log(`Country: ${country}`);
      //     console.log(`State: ${state}`);
      //   } else { 
      //     console.error(`Geocoder failed: ${status}`);
      //   }
      // })
    });
  }

  // navigator.geolocation.getCurrentPosition((position:any)=>{
  //   this.auth.getLocation(position.coords.latitude, position.coords.longitude).subscribe((data: any) => {
  //     this.currentLocation = data.results[0].formatted
  //     this.pincode = data.results[0].components.postcode
  //     this.locationDetails = data
  //     localStorage.setItem('current-location',JSON.stringify(this.locationDetails))
  //     this.markers = []
  //     this.markers.push({
  //       position: {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       },
  //       length:16,
  //       label: {
  //         color: 'red',
  //         text: this.currentLocation,
  //       },
  //       title: this.currentLocation + (this.markers.length + 3),
  //       options: { animation: google.maps.Animation.DROP },

  //     })
  //     this.center={
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     }
      
  //   })
  // })
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
}

geocodeAddress(address: string) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, (results:any, status:any) => {
    if (status === google.maps.GeocoderStatus.OK) {
      this.markers.push({
        position: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }, 
        length:16,
        label: {
          color: 'red',
          text: this.currentLocation,
        },
        title: this.currentLocation + (this.markers.length + 3),
        options: { animation: google.maps.Animation.DROP },
      })
    }
  });
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

textareachange(data:any){
  this.instructions=this.instructionsTextarea
  if(data=='btnactivefour'){
    this.btnActiveOne=false
    this.btnActiveTwo=false
    this.btnActiveThree=false
  }
}

locationTag(e:any){
  this.address_tag=e
}

addressCurrentLoc(){

}

geocodeAddress1(address: string): Promise<google.maps.GeocoderResult[]> {
  return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results: google.maps.GeocoderResult[] | any, status: google.maps.GeocoderStatus) => {
      if (status === "OK") {
        // Get the country and state from the address components
        const address_components:any = results[0].address_components;
        const country = address_components.find((component:any) => component.types.includes("country")).long_name;
        const state = address_components.find((component:any) => component.types.includes("administrative_area_level_1")).long_name;
        // Do something with the country and state
      } else { 
        console.error(`Geocoder failed: ${status}`);
      }
    });
  });
}

locationSearch(name:any){
  //  this.auth.locationSearch(name).subscribe((d:any)=>{
  //    console.log(d,"IUYIUYIUWYIWUIUWIUWIUWY");
     
  //  })
  // this.auth.getDatasearchLoc(name).then((d:any)=>{
  //        console.log(d,"IUYIUYIUWYIWUIUWIUWIUWY");
  // })
}


routing(name:any){
  if(this.userData!=null){
    if(name=="profile"){
      this.router.navigate(['/sidra-profile/sidra-profile-edit'])
    }
    if(name=="deliveryaddress"){
      this.router.navigate(['/sidra-profile/address/delivery'])
    }
    if(name=="orders"){
      this.router.navigate(['/sidra-profile/orders'])
    }
    if(name=="wishlist"){
      let key="null"
      this.router.navigate(['/wishlist/'+key])
    } 
    if(name=="notification"){
      this.router.navigate(['/sidra-profile/notification'])
    }
    if(name=="settings"){
      this.router.navigate(['/sidra-profile/setting'])
    }
  }else{
    this.router.navigate(['/auth'])
  }

}

navigate(){
  let key="null"
  this.router.navigate(['wishlist/'+key])
}

}