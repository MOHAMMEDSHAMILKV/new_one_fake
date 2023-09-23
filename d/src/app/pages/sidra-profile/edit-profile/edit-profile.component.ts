import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MessengerService } from 'src/app/services/messenger.service';
import { DealsService } from 'src/app/services/deals.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
   
  country:any
  nationality="Your Nationality"
  fname:any
  lname:any
  gender:any="Select your Gender"
  date_of_birth:any
  date:any
  alternative_mobile_no:any
  alternative_email:any
  finalDate:any
  userData:any
  profileData:any=[]
  // minDate = new Date(2010, 0, 3); 
  maxDate = new Date(2004, 12, 31);
  country_code: any = "971"
  contry_code_list = environment.conutryList
  cell_code1:any
  subscribeTimer = 20
  timeLeft = 20
  addressotp: any = ""
  button_active = false
  otpDisplay=false
  genderArray:any=[
    {'name':'Select your gender'},
    {'name':'Female'},
    {'name':'Male'},
    {'name':'I prefer not to say'}
  ]
  password:any 
  contact:any
  subcontentname:any
  constructor(private auth:AuthService,
              private toastr:ToastrService,
              private msg:MessengerService,
              private deals:DealsService,
              private router:Router) { }

  ngOnInit(): void {
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
    this.auth.getCountry().subscribe((data:any)=>{
      this.country= Object.values(data.data) 
    }) 
    this.auth.getUserProfile().subscribe((data:any)=>{
      this.profileData=data.data
      this.fname=this.profileData?.fname
      this.lname=this.profileData?.lname 
      this.alternative_email=this.profileData?.email
      this.alternative_mobile_no=this.profileData?.mobile
      this.gender=this.profileData?.gender=="M"?"Male":(this.profileData?.gender=="F"?"Female":"I prefer not to say")
      this.country_code=this.profileData?.mobile_code
      this.nationality=this.profileData?.country 
      console.log("33333",this.alternative_mobile_no);
      
    }) 
    this.msg.getWithoutRefresh().subscribe((data:any)=>{
      this.auth.getUserProfile().subscribe((data:any)=>{
        this.profileData=data.data
        this.fname=this.profileData?.fname
        this.lname=this.profileData?.lname
        this.alternative_email=this.profileData?.email
        this.alternative_mobile_no=this.profileData?.mobile
        this.gender=this.profileData?.gender=="M"?"Male":(this.profileData?.gender=="F"?"Female":"I prefer not to say")
        this.date_of_birth=this.profileData?.date_of_birth
        this.nationality=this.profileData?.country 
      }) 
    }) 
   
 
  }

  nationalitySelection(e:any){
    this.nationality=e.target.value
  }

  selectGender(e:any){
      this.gender=e.target.value
      console.log("gender",this.gender);
      
  }

  // selectDateOfBirth(){
  //       let day = this.date_of_birth.getDate();
  //       let month = this.date_of_birth.getMonth() + 1; 
  //       let year = this.date_of_birth.getFullYear();
  //       this.finalDate=year + '-' + month + '-' + day // final date
  // }

  updateProfile(){
     if(this.lname!=null&&this.fname!=null&&this.gender!=null||
      this.gender=="Select Gender"&&this.alternative_email!=null
      &&this.nationality!=null||this.nationality=="Your Nationality"
      &&this.alternative_mobile_no!=null)
      {
        this.gender=this.gender=="Male"?"M":(this.gender=="Female"?"F":"O")
         let profileUpdate={
          fname: this.fname,
          lname:this.lname,
          gender:this.gender,
          date_of_birth: this.finalDate,
          alternative_mobile_no:'+'+this.country_code+ this.alternative_mobile_no,
          country:this.nationality,
          email: this.alternative_email
         } 
         this.auth.profileUpdate(profileUpdate,this.userData.customer_id)
         console.log("profileupdateeeeee$$$$$$$",profileUpdate);
         console.log("userdata$$$$$$$$$$",this.userData);
         
         
     }else{
       this.toastr.warning("Please fill all data properly")  
     }
  }

  telInputObject(e:any){
    this.cell_code1.setNumber(+91) 
    // this.cellnumber1=e
  }

  show(e:any,date:any){
    let a=new Date(e.value).toISOString()
    this.finalDate=a.split('T')[0]
  }

  observableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      if (val > this.timeLeft) return
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  
  update_email(){
let data1={
  data:""
}
this.auth.email_verify(data1)
    this.msg.getOtp().subscribe((d: any) => {
      if (d.status == "success") {
        this.otpDisplay = true
        this.observableTimer()
      }
    })
  }


  email_verify(){

 
  }
  onOtpChange(e: any) {
    this.addressotp = e
    this.button_active = this.addressotp.length == 5 ? true : false
  }
  deativateAccount(){
    let pass={
      login_password:this.password
    }
    this.auth.profileDeativate(pass)
    this.msg.getpopupclose().subscribe((data:any)=>{
      const modal = document.getElementById('cardadding');
      if (modal) {
         modal.style.display = 'none';
      }
      this.router.navigate(['']);
    })
  }
  
}
