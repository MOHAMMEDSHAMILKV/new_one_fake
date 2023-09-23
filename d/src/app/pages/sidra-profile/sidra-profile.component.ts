import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidra-profile',
  templateUrl: './sidra-profile.component.html',
  styleUrls: ['./sidra-profile.component.scss']
})
export class SidraProfileComponent implements OnInit {
  is_active=false
  isactive_1=false
  isactive_2=false
  isactive_3=false
  isactive_4=false
  isactive_5=false
  isactive_6=false
  isactive_7=false
  isactive_8=false
  isactive_9=false
  isactive_10=false
  isactive_11=false
  isactive_12=false
  isactive_13=false
  isactive_14=false
  isactive_15=false
  profileData:any
  updatedprofile:any
  api_user=environment.api_user
  userDetails:any
  isLoading=false
  maincontent = true;
  subcontent = true;
  menuheader=true
  mainheader=true
  back=false
  subcontentname:any
  constructor(private toastr:ToastrService,private http:HttpClient,
              private auth:AuthService,private msg:MessengerService,
              private router:Router,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let user:any = localStorage.getItem('marketplaceUser')
    this.userDetails = JSON.parse(user) 
    this.auth.getUserProfile().subscribe((data:any)=>{
      this.profileData=data.data
      this.updatedprofile=data.data?.profile_pic
      console.log(this.updatedprofile);
      
      // if (!this.updatedprofile) {
      //   this.updatedprofile = '../../../assets/images/profile_dedualt_pic.svg' // Replace with your default profile picture URL
      // }
    }) 
    this.msg.getWithoutRefresh().subscribe((data:any)=>{
      this.auth.getUserProfile().subscribe((data:any)=>{
        this.profileData=data.data
      }) 
    })
    const storedValue = localStorage.getItem('subcontentname');
    
    if (storedValue) {
      this.subcontentname = JSON.parse(storedValue);
      if(this.subcontentname==="All Orders"){
        // window.location.reload();
      }
      console.log("<><><><><><><><><><><><><>",storedValue);
    }
    const isMobileView = window.innerWidth <= 575;

    if (isMobileView) {
      this.maincontent = true;
      this.subcontent = false;
      this.menuheader=false
      // this.subcontentname= 'Edit Profile'
      
    }
    console.log("ddddd66666666666",this.subcontentname);
    
  }

mouseOver(data:any){
  this.is_active = data =='EditProfile' ? true : false
  this.isactive_1 = data =='changepassword' ? true : false
  this.isactive_2 = data =='review' ? true : false
  this.isactive_3 = data =='measure' ? true : false
  this.isactive_4 = data =='AllOrders' ? true : false
  this.isactive_5 = data =='Subscribed' ? true : false
  this.isactive_6 = data =='Delivery' ? true : false
  this.isactive_7 = data =='Picup' ? true : false
  this.isactive_8 = data =='WALLET' ? true : false
  this.isactive_9 = data =='NOTIFICATION' ? true : false
  this.isactive_10 = data =='MESSAGE' ? true : false 
  this.isactive_11 = data =='BUSINESS' ? true : false
  this.isactive_12 = data =='SETTINGS' ? true : false
  this.isactive_13 = data =='LOGOUT' ? true : false
  this.isactive_14 = data =='buyit' ? true : false
  this.isactive_15 = data =='alllogout' ? true : false
} 

mouseLeave(data:any){
  this.is_active = data =='EditProfile' ? false : false
  this.isactive_1 = data =='changepassword' ? false : false
  this.isactive_2 = data =='review' ? false : false
  this.isactive_3 = data =='measure' ? false : false
  this.isactive_4 = data =='AllOrders' ? false : false
  this.isactive_5 = data =='Subscribed' ? false : false
  this.isactive_6 = data =='Delivery' ? false : false
  this.isactive_7 = data =='Picup' ? false : false
  this.isactive_8 = data =='WALLET' ? false : false
  this.isactive_9 = data =='NOTIFICATION' ? false : false
  this.isactive_10 = data =='MESSAGE' ? false : false
  this.isactive_11 = data =='BUSINESS' ? false : false
  this.isactive_12 = data =='SETTINGS' ? false : false
  this.isactive_13 = data =='LOGOUT' ? false : false
  this.isactive_14 = data =='buyit' ? true : false
  this.isactive_15 = data =='allogout' ? true : false


}
changPassMouseOver(){
  this.isactive_1=true
}

changPassMouseLeave(){
  this.isactive_1=false
} 

myreviweMouseOver(){
  this.isactive_2=true 
}

myreviweMouseLeave(){
 this.isactive_2=false
}
mesurmentMouseOver(){
  this.isactive_3=true
}

mesurmentMouseLeave(){
 this.isactive_3=false
}

logout(e:any){
  if(e=="logout"){
    localStorage.clear()
    this.toastr.success('Logout success')
    this.isLoading=true
    this.router.navigate(['/'])
    setTimeout( () => { 
      window.location.reload()
      this.router.navigate(['/'])
      this.isLoading=false
    }, 1000);
  }else if(e=="allogout"){
    this.auth.accountLogOutAll().subscribe((s:any)=>{
      localStorage.clear()
      this.toastr.success('Logout all device success')
      this.isLoading=true 
      this.router.navigate(['/'])
      setTimeout( () => { 
        window.location.reload()
        this.router.navigate(['/'])
        this.isLoading=false
      }, 1000);
    })
  }
} 

onSelectFile(event:any){
  let user:any = localStorage.getItem("marketplaceUser")
  let userData = JSON.parse(user)
  let tokens=userData.token 
  let headers=new HttpHeaders({
   Authorization: `token ${tokens}`
 }) 
  if(userData.customer_id === undefined){
    return 
  }else{
    const profilepic = <File>event.target.files[0]
    const fd:any = new FormData();
    fd.append('profile_pic',profilepic)
    this.http.patch(this.api_user+"/user-account_profilepicupdate/"+userData.login_id,fd,{headers}).toPromise().then((d:any)=>{
        this.updatedprofile=d.data.profile_pic
    })
}
}

toggle(e:any){
  const isMobileView = window.innerWidth <= 575;
  if(isMobileView){
    this.maincontent = false;
    this.subcontent = true;
    this.back=true
    this.subcontentname=e
    this.mainheader=false
    localStorage.setItem('subcontentname', JSON.stringify(this.subcontentname));
  }
  console.log("subcontentname1111",this.subcontentname);
  
}
Back(){
  const isMobileView = window.innerWidth <= 575;
  if(isMobileView){
    this.maincontent = true;
    this.subcontent = false;
    this.back=false
    this.mainheader=true
  }
}
}
