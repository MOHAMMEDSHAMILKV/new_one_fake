import { Component, OnInit,Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { data } from 'src/assets/database/brand1';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';

import UIkit from 'uikit';
@Component({
  selector: 'app-sidra-cart-items',
  templateUrl: './sidra-cart-items.component.html',
  styleUrls: ['./sidra-cart-items.component.scss']
})
export class SidraCartItemsComponent implements OnInit {
  cartArray:any
  currentQty:any=1
  managedeliverActive=true
  NormalDeliveryActive=false
  GetitTogetherActive=false
  addressAddingActive=false
  addressList=false
  addressdata=true
  addressArray:any=[]
  manageAddress:any
  deliveryTime:any=[]
  combinedArray:any=[]
  dateArray:any=[]
  dateString:any
  editaddress=false
  editDuplicateData:any
  addressAddingActivepopup=false
  cartItemsIndividual:any
  delivery_id:any
  delivery_date:any
  CombinedArray:any=[]
  finalCombineProducts:any
  svaeForLaterArray:any=[]
  @Input() isSaveForLater=false 
  dateList:any=[]
  deliveryDate=false
  normal=true
  together=false
  disabledAdder=false
  is_address_select:any
  cart_id:any
  active1:any
  active2:any
  groupListArray:any=[]
  is_wish_active:any
  is_wishlisted=false
  userDetail:any
  saveForLaterFalseTrue=false
  buyNowTrueFalse=false
  maxQty:any
  minMumQty:any
  IsmodelShowAddressCreate=false
  address_type:any=null
  country:any=[]
  nationality:any=""
  stateArray:any=[]
  state:any=""
  city:any=""
  full_name:any=""
  contact:any=""
  street_name:any=""
  building_name:any=""
  landmark:any=null
  instructions:any=null
  instructionsTextarea:any
  address_tag:any="Home"
  conditionDetail:any
  otpDisplay=false
  btn_Active=false
  public btnActiveOne:boolean=false
  public btnActiveTwo:boolean=false
  public btnActiveThree:boolean=false
  addressListEdit:any=[]
  addressotp:any=""
  home=true 
  office=false
  custom=false
  contry_code_list=environment.conutryList
  country_code:any="971"
  instBox:any
  is_default=true
  updateBtnActive=false
  updateBtnActiveOtp=false
  addressId:any
  subscribeTimer=20
  timeLeft = 20
  button_active=false
  cartDataMainLocal:any=[]
  slotIndex:any
  dateIndex:any
  plus_btn_active=false
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
  lat:any=0
  lng:any=0
  zoom = 20
  currentLocation = ""
  street:any=""
  district:any=""
  markerPosition:any 
  defaultAdress:any=[]
  locationAddressList:any
  avaliableLocation=false
  userLatitude:any
  userLongitude:any
  isFullMap=false
  userAddress: string = ''
  optionsOfLoc:any="default"

  constructor(private cart:CartService,
              private msg:MessengerService,
              private auth:AuthService,
              private router:Router,
              private wish:WishlistService) { }
  cartDataMain:any=[] 

  
  ngOnInit(): void {
    let user:any = localStorage.getItem("marketplaceUser")
    this.userDetail = JSON.parse(user) 
    this.auth.getCountryNew().subscribe((data:any)=>{
      this.country = data.data
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
      console.log(data,"******&&&&^^^^^^^^^^^^^^!@############!#@");
      this.msg.getOtp().subscribe((d:any)=>{
        this.avaliableLocation=d.data.value
      })
    }) 
    if(this.userDetail!=null){
      this.saveForLaterFalseTrue=true
      this.buyNowTrueFalse=true
      let dataKey="cartData" 
      let history:any =  localStorage.getItem(dataKey)
      this.cartDataMainLocal = JSON.parse(history)
       let sendLocal:any=[] 
      if(this.cartDataMainLocal!=null){ 
        for(let i of this.cartDataMainLocal){
          let items={
            inventory_id:i.inventory_id,
            variant_id:i.variant_id,
            quantity:i.quantity
          }
          sendLocal.push(items)
        }
        let sendLocalCart:any={
          cart_products:sendLocal
        }
       this.cart.BulkUploading(sendLocalCart)
      }
      this.cart.getsidraCart().subscribe((data:any)=>{
        this.cartDataMain=data.data?.results
      })   
      this.msg.getRefreshData().subscribe((d:any)=>{
        this.cart.getsidraCart().subscribe((data:any)=>{
          this.cartDataMain=data.data?.results
        })  
      })  
      this.cart.getSaveLater().subscribe((data:any)=>{
        this.svaeForLaterArray=data.data?.results
      }) 
      this.msg.getRefreshData().subscribe((d:any)=>{
        this.cart.getSaveLater().subscribe((data:any)=>{
          this.svaeForLaterArray=data.data?.results
        }) 
      })
      this.auth.getAddressList().subscribe((data:any)=>{
        this.addressArray=data.data?.results
      }) 
      this.wish.getWishListGroup().subscribe((d:any)=>{
        this.groupListArray=d.data.results
      })
      
    }
    else{
      let dataKey="cartData"
      let history:any =  localStorage.getItem(dataKey)
      this.cartDataMain = JSON.parse(history)
      console.log(this.cartDataMain); 
      this.saveForLaterFalseTrue=false
      this.buyNowTrueFalse=false 
      this.isSaveForLater=false 
    }

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
            console.log(this.street,"&&&&&@@@@@@@@@&&&&&&&&&&&&@@@@@@@@@@@@@@@@@&&&&&&&@@@@@@");
            this.msg.getOtp().subscribe((d:any)=>{
                this.avaliableLocation=d.data.value
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
    // this.idHalfMapAddress=true
    this.addressAddingActivepopup=true
  }

  fullMap(){
    this.addressAddingActivepopup=false
    this.isFullMap=true
  }

  normalfun(){
    this.normal=true
    this.together=false
  }

  togetherFun(){
    this.normal=false
    this.together=true
  }
  
  removeFromCart(e:any,i:any){
     if(this.userDetail!=null){
        this.cart.removeSidraCart(e)
     }
     else{
        this.cartDataMain.splice(i,1)
        let dataKey="cartData"
        localStorage.setItem(dataKey,JSON.stringify(this.cartDataMain))
     }
  } 

  

  movetoAnother(item:any,id:any,index:any){
    // this.ismove_active=true
    if(this.userDetail!=null){
      let wish={
        variant_id:item.variant_id,
        group_id:id,
        varient_code:item.variant_code,
        inventory_code:item.inventory_id
      }
      this.wish.createWishlist(wish) 
      this.is_wish_active=index
      this.is_wishlisted=true
    }
    else{
      this.router.navigate(['auth'])
    }
  }

  adder(item:any,i:any){
    let min:any
    let max:any
    if ((item?.min_sales_order != null && item?.min_sales_order != 0) || (item?.max_sales_order != null && item?.max_sales_order != 0)) {
      min  = (item?.min_sales_order != null && item?.min_sales_order != 0) ? item?.min_sales_order : 1 
      max  = (item?.max_sales_order != null && item?.max_sales_order  != 0 && item?.max_sales_order  > item?.available_qty) ? item?.available_qty : item?.max_sales_order 
    }else{
      max   = (item?.max_sales_order  == null || item?.max_sales_order  == 0 ) ? (item?.available_qty > 0) ? item?.available_qty : 10 : 10
      min = 1
    } 
    // max = this.products?.max_order_limit > 10 ? 10 : this.products?.max_order_limit 
    this.currentQty=min 
    this.maxQty=max
    this.minMumQty=min 
    if(this.userDetail!=null){
      if(this.currentQty!=0){
        if(item.quantity < this.maxQty){
          item.quantity=item.quantity+1
          let product = {
            id: item.id,
            inventory_id: item.inventory_id,
            image1: item.image1,
            name:item.name
          }  
          this.cart.addToCartQuantityUpdate(product,item.quantity,item)
        }
       } 
    }else{
      if(item.quantity < this.maxQty){
        item.quantity=item.quantity+1
        // item.price=item.price*item.quantity
        // this.msg.sendPriceUpdate()
        let data:any=[] 
        let finalprice:any
        let history:any =  localStorage.getItem('cartData')
        data = JSON.parse(history) 
        data[i].quantity = item.quantity; 
        data[i].total_price=item.quantity*item.price
        localStorage.setItem('cartData',JSON.stringify(data))
        finalprice= data.reduce(function(prev:any, cur:any) {
          return prev + cur.total_price; 
        }, 0); 
        console.log(finalprice);  
        this.msg.sendPriceUpdate(finalprice)
      }
    }
  }

  reduce(d:any,i:any){
    if(this.userDetail!=null){
      if(d.quantity!=0){
        if(this.maxQty>10){
          this.maxQty=10
        }
       if(d.quantity>this.minMumQty){
        d.quantity=d.quantity-1
        let product = {  
          id: d.id,
          inventory_id: d.inventory_id,
          image1: d.image1,
          name:d.name
        } 
        this.cart.addToCartQuantityUpdate(product,d.quantity,d)
        // this.plus_btn_active=false
       }
     } 
    //  else if(d.quantity==0){
    //     this.disabledAdder=true
    //  }
    }else{
      if(this.maxQty>10){
        this.maxQty=10
      }
     if(d.quantity>this.minMumQty){
      d.quantity=d.quantity-1
        let finalprice:any
        let data:any
        let history:any =  localStorage.getItem('cartData')
        data = JSON.parse(history) 
        data[i].quantity = d.quantity; 
        data[i].total_price=d.quantity*d.price
        console.log(i); 
        localStorage.setItem('cartData',JSON.stringify(data))
        console.log(data); 
        finalprice= data.reduce(function(prev:any, cur:any) {
          return prev + cur.total_price; 
        }, 0); 
        console.log(finalprice); 
        this.msg.sendPriceUpdate(finalprice)
     }
    }

  }


  listAddress(item:any){
    // this.managedeliverActive=false
    // this.GetitTogetherActive=false
    this.addressAddingActive=false
    this.addressList=true
    this.addressdata=false
    this.editDuplicateData=item
    this.editaddress=false
    this.addressAddingActivepopup=false
    this.is_address_select=this.addressArray.findIndex((d:any)=>d.id==this.manageAddress.id)
  } 

  edit(item:any){
    this.addressAddingActive=true
    this.addressList=false
    this.addressdata=false
    // this.editaddress=true
    this.addressAddingActivepopup=true
    this.editDuplicateData=item

    this.addressListEdit=this.addressArray.filter((d:any)=>d.id==item)
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
      //  this.selectionInst(this.instructions)
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

  addnew(){
    // this.managedeliverActive=false
    // this.GetitTogetherActive=false
    this.addressAddingActive=true
    this.addressList=false
    this.addressdata=false
    this.addressAddingActivepopup=true
    this.full_name=""
    this.contact=""
    this.building_name=""
    this.street_name=""
    this.city=""
    this.landmark=""
    this.nationality=""
    this.state=""
    this.instBox=""
  } 
  
  back(){
    this.addressAddingActive=false
    this.addressList=false
    this.addressdata=true
    this.editaddress=false
    this.addressAddingActivepopup=false
  }

  back2(){
    this.addressAddingActive=false
    this.addressList=true
    this.addressdata=false
    this.editaddress=false
    this.addressAddingActivepopup=false
  }

  manageDelivery(data:any){
    this.cartItemsIndividual=data 
    this.cart_id=data.id
    this.manageAddress=data?.delivery_address
    console.log(this.manageAddress);
    
    let deliverTime={
      category: data?.category_code,
      group: data?.group_code,
      segment:  data?.segmentation,
      address: data?.delivery_address?.street_name,
      state:  data?.delivery_address?.state,
      country: data?.delivery_address?.country,
      postalcode: null,
      city_or_town: this.manageAddress.city,
      varient_code: data?.variant_id,  
      deliverTime:data?.inventory_id,
    }
    this.cart.deliveryTime(deliverTime) 
    this.msg.processComplete().subscribe((data:any)=>{
      this.deliveryTime=data
    }) 
    let finalData:any
    let items:any=[]
    for(let i of this.cartDataMain){
        let combined:any={
          name:i.name,
          image:i.image,
          category:i.category_code,
          group: i.group_code,
          estimated_delivery:i.estimated_delivery,
          segment:i.segmentation,
          estimated_time:i.estimated_time,
          id:i.id,
          is_selected:"true" 
        } 
        items.push(combined)
        finalData={
          items:items
        }
    } 
    this.cart.postCombinedProducts(finalData,) 
    this.msg.getMessage().subscribe((data:any)=>{
      this.combinedArray=data
    })
  } 

  dateCombinedArray(e:any, date:any,i:any){
    let fullDate:any
    if(e.target.checked==true){  
      fullDate={
        date:date.estimated_delivery,
        name:date.name
      }
      this.dateArray.push(fullDate) 
      this.dateString=""
      const maxDate = new Date(
        Math.max(
          ...this.dateArray.map((element:any) => {
            return new Date(element.date);
          }),
        ),
      );
      this.dateString = maxDate;
      this.dateString = new Date(maxDate).toUTCString();
      this.dateString = this.dateString.split(' ').slice(0, 4).join(' ');
      let items:any={
        name:date.name,
        segment:date.segment,
        category:date.category,
        group:date.group,
        is_selected:date.is_selected,
        estimated_delivery:this.dateString,
        estimated_time:date.estimated_time,
        image:date.image
      }
      // let CombinedArray:any=[]
      this.CombinedArray.push(items)
    }else{  
      let index = this.dateArray.findIndex((x:any) => x.name == i);
      this.dateArray.splice(index,1)  
      const maxDate = new Date(
        Math.max(
          ...this.dateArray.map((element:any) => {
            return new Date(element.date);
          }),
        ),
      );
      this.dateString = maxDate;
      this.dateString = new Date(maxDate).toUTCString();
      this.dateString =  this.dateString.split(' ').slice(0, 4).join(' ');
    }  
  } 

  applyDeliveryAddress(){
    let data:any={
      category: this.cartItemsIndividual.category_code,
      group: this.cartItemsIndividual.group_code,
      segment: this.cartItemsIndividual.segmentation,
      address:this.cartItemsIndividual.delivery_address.street_name,
      state: this.cartItemsIndividual.delivery_address.state,
      country: this.cartItemsIndividual.delivery_address.country,
      varient_code: this.cartItemsIndividual.variant_id,
      delivery_id:this.cartItemsIndividual.delivery_address_id,
      cart_id:this.cartItemsIndividual.id,
      delivery_date:this.delivery_date
    } 
    this.auth.updateDeliveryAddress(data) 
    
  }

  changeAddressUpdation(){
    let data={
      delivery_address_id:this.delivery_id
    }
    this.auth.updateCartSingleProduct(this.cart_id,data) 
    this.msg.getStatus().subscribe((d:any)=>{
      if(d=='success'){
        this.managedeliverActive=true
        this.addressList=false
        this.addressdata=true
        this.auth.getAddressList().subscribe((data:any)=>{
          this.addressArray=data.data?.results
        }) 
      } 
    })
  }

  
   
  deliverId(id:any,i:any,date:any,name:any){
      this.slotIndex=i
      this.delivery_id=id
      console.log(data);
      this.delivery_date=date
      let singleData=this.deliveryTime.filter((d:any)=>d.notes==name)
      console.log(singleData);
      this.dateList=singleData[0].date_list
      if(this.dateList.length!=0)
      {
        this.deliveryDate=true
      }
  }

  dateSelect(d:any){
    this.delivery_date=d
  }

  applyGetItToGether(){
     
  }

  getItTogther(){
      this.finalCombineProducts={
        items:this.CombinedArray
      }
      this.auth.updateGetItTogether(this.finalCombineProducts)
  }

  saveForLater(id:any){
    if(this.userDetail!=null){
      let save={
        variant_id:id
      }
      this.cart.saveForLater(save)
    }else{
      this.router.navigate(['auth'])
    }
  }

  DeletesaveForLater(id:any){
    let save={
      variant_id:id
    }
    this.cart.CancelForLater(save)
  }

  addToCart(item:any){
    let product = {
      id: item.id,
      inventory_id: item.inventory_code,
      image1: item.image1,
      name:item.name
    }   
    
    this.cart.addToCartsample(product,this.currentQty,item) 
  }

  addToCartForSaveForLater(item:any){
    let product = {
      id: item.id,
      inventory_id: item.inventory_code,
      image1: item.image1,
      name:item.name,
    }   
    this.cart.addToCartsampleForLater(product,this.currentQty,item) 
  }

  normalFun(){
    this.managedeliverActive=true
    this.NormalDeliveryActive=false
    this.normal=true
    this.together=false
  }
  combine(){
    this.managedeliverActive=false
    this.NormalDeliveryActive=true
    this.normal=false
    this.together=true
  }

  buyNow(item:any){
    if(this.userDetail!=null){
      let customer_Address_id:any 
      let orderlinesArray:any=[]
      let finalAddress:any=this.addressArray.filter((d:any)=>d.is_default==true)
      if(item.delivery_address_id==null){
        customer_Address_id=finalAddress[0].id
      }else{
        customer_Address_id=item.delivery_address_id
      }
      let orderlines:any={
        cart_id:item.id ,
        variant_id:item.variant_id,
        total_quantity:item.quantity,
        branch_id:item.branch_code,
        amount:item.price,
        is_active:item.is_active,
        inventory_id:item.inventory_id, 
        delivery_id:item.delivery_address_id,
        delivery_slot:item.delivery_slot.id
      }
      orderlinesArray.push(orderlines)
       let order={
        orderlines:orderlinesArray ,
        delivery_mode:null,
        delivery_address_id:customer_Address_id,
        billing_address_id:customer_Address_id
      }
      this.cart.OrderCreate(order)
    }else{
      this.router.navigate(['auth'])
    }

  }

  onSelect(i:any,data:any){
     this.is_address_select=i
     this.delivery_id=data.id
  } 
  navigateProductPage(id:any){
    this.router.navigate(['/product/' + id])
  } 

  activeBtn(name:any){
    if(name=="active1"){
      this.active1=true
      this.active2=false
    }
    if(name=="active2"){
      this.active1=false
      this.active2=true
    }
  }

  // Address creation and updation

  locationTag(e:any){
    this.address_tag=e
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

  instructionsSelection(condition:any){
    this.instructions=condition
    this.instBox=condition
  } 

  textareachange(){
    this.instructions=this.instructionsTextarea
    this.instBox=""
}

makeUsDefault(e:any){
  this.is_default=e.target.checked
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


addresCreate(){
  let address={
    address_type:"billing_address",
    country:this.nationality,
    state:this.state,
    city:this.city,
    full_name:this.full_name,
    contact:'+'+this.country_code+this.contact.replace(/\s/g, ''),
    street_name:this.street_name,
    building_name:this.building_name,
    landmark:this.landmark,
    instructions:this.instructions,
    address_tag:this.address_tag ,
    default:this.is_default
  } 
  this.auth.createAddress(address)
  this.msg.getOtp().subscribe((d:any)=>{
    if(d.status=="success"&&d.message!='Address already exist'){
      this.otpDisplay=true
      this.observableTimer()
    }else{
      // UIkit.modal('#location_address').hide();    
      this.addressList=true
      this.addressAddingActivepopup=false
      this.addressAddingActive=false
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

onOtpChange(e:any){
  this.addressotp=e
  this.button_active=this.addressotp.length==5?true:false
}

addresVarification(){
  let address={
    address_type:"billing_address",
    country:this.nationality,
    state:this.state,
    city:this.city,
    full_name:this.full_name,
    contact: '+'+this.country_code+this.contact,
    street_name:this.street_name,
    building_name:this.building_name,
    landmark:this.landmark,
    instructions:this.instructions,
    address_tag:this.address_tag ,
    otp:this.addressotp
  } 
  this.auth.createAddress(address)
  this.msg.getOtp().subscribe((d:any)=>{
    if(d=="success"){
      this.IsmodelShowAddressCreate=false
      this.otpDisplay=false
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
    contact: '+'+this.country_code+this.contact.replace(/\s/g, ''),
    street_name:this.street_name,
    building_name:this.building_name,
    landmark:this.landmark,
    instructions:this.instructions,
    address_tag:this.address_tag ,
    otp:this.addressotp,
    key:this.addressotp
  } 
  this.auth.updateSidraAddress(this.addressId,address)
  this.msg.getOtp().subscribe((d:any)=>{
     if(d=='success'){
        this.otpDisplay=false
        this.IsmodelShowAddressCreate=true
        this.addressList=true
        this.addressAddingActivepopup=false
     }
  })
}  

reSendOtp(){
  let resend={
    contact:'+971'+this.contact
  }
  this.auth.resendforaddress(resend)
  this.observableTimer()
  this.button_active=false
  this.otpDisplay=true
  this.msg.getOtpForAddressResend().subscribe((D:any)=>{
    if(D=='success'){
      this.otpDisplay=true
    }
  })
}

open(){
    this.otpDisplay=true
}

dateIndexSelection(j:any){
    this.dateIndex=j
    this.delivery_date=j
}


}
