import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpCount=5
  otpRoute= { name:String};
  Justemail:any=""  
  JustMobile:any=""
  otpNumber:any
  interval:any
  otpData:any = {}
  timeLeft = 20
  subscribeTimer = 20
  isForgot = false
  otp_1=""
  otp_2=""
  otp_3=""
  otp_4=""
  otp_5=""
  button_active=false
  constructor(private toaster: ToastrService,
    private _router:Router,
    private messenger:MessengerService,
    private auth:AuthService,
    private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.observableTimer()
    this.otpRoute ={
      name: this.route.snapshot.params['name'],
    } 
    let mail = localStorage.getItem('forgotmail')
    // this.auth.forgotPassword(mail).subscribe((data:any)=>{
    //   console.log(data);
    //   setTimeout(() => {
    //     if(data.status == 'success'){
    //       this.isForgot = true
    //       console.log(this.isForgot,"______");
    //       // alert(data.message)
    //     }
    //   }, 500);
    // })
    if(mail != null){
      this.Justemail = mail
    }
    let data = this.auth.getOtpDetails()
    // console.log(data.otp,"______from otp");
    // this.otpNumber = data.otp
    // this.otpData = data
    // let sData:any = localStorage.getItem('userSignupData')
    // let SignupData = JSON.parse(sData)
    // this.otpData = SignupData
    // this.JustMobile = SignupData?.mobile
    this.observableTimer()
  }

  checkRoute(data:any){
    if(data == 'forgot'){
      return true
    }else{
      return false
    }
  }

  submitOtp(){
    if(this.otpNumber == ""){
      return
    }else{
      let otpData ={
        email: this.otpData.email,  
        password: this.otpData.password,  
        mobile: this.otpData.mobile,  
        fname: this.otpData.fname,  
        lname: this.otpData.lname, 
        gender: this.otpData.gender,
        country:this.otpData.country,
        otp: this.otpNumber  
      }
      this.auth.postOtp(otpData)
    }
    
  }

  submitOtpForForgot(){
    if(this.otpNumber == "" || this.otpNumber.length < this.otpCount || this.otpNumber.length >this.otpCount){
      this.toaster.warning("Please recheck you top number")
      return
    }else{
      let otpData = {
        otp: this.otpNumber,
        email :this.Justemail
      }
      this.auth.postForgotOtp(otpData).subscribe((data:any)=>{
        setTimeout(() => {
          if(data.status == 'success'){
            this.isForgot = true
            this.toaster.success(data.message)
            this.messenger.sendForgotOtpConfirm(otpData)
            this._router.navigate(['/auth/reset/new']) 
          }else{
            this.toaster.warning(data.message)
          }
        }, 1000);
      })
      
    }
    
  }

  resendOtpNew(){
    let sData:any = localStorage.getItem('signupData')
    let SignupData = JSON.parse(sData)
    let email:any=localStorage.getItem('forgotmail')
    let testEmail=JSON.parse(email)
    this.auth.signupPostResend(SignupData)
    this.messenger.getOtpValidate().subscribe((data:any)=>{
      if(data=="success"){
        this.observableTimer()
        this.toaster.success("SignUp OTP is sented to your entered mobile number and email address")
      }
    })
    // setTimeout(() => {
    //   window.location.reload()
    // }, 1000);
    
  }

  resendOtpForgot(){
    let email:any=localStorage.getItem('forgotmail')
    // let testEmail=JSON.parse(email)
    this.auth.forgotPassword(email).subscribe((data:any)=>{
      if(data.status == 'success'){
        // this.toaster.success(data.message)
        this.observableTimer()
        this.messenger.sendForgot(email)
        this._router.navigate(['/auth/otp/forgot'])
        localStorage.removeItem('forgotmail')
        localStorage.setItem('forgotmail',email)
      }else{
        // this.toaster.warning(data.message)
      }
    }) 
    this.messenger.sendForgot(email)
    // setTimeout(() => {
    //   window.location.reload()
    // }, 1000);
  }

  observableTimer() {
    const source = timer(1000,1000);
    const abc = source.subscribe(val => {
      if(val > this.timeLeft) return 
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  otpSend(){
    // let otp:any
    // otp=this.otp_1.concat(this.otp_2,this.otp_3+this.otp_4+this.otp_5)
    let sData:any = localStorage.getItem('userSignupdata')
    let SignupData:any = JSON.parse(sData)
    // let newStr = SignupData.mobile.replace(/\s+/g, '');
    let otpdata:any={
      email:SignupData.email,
      mobile:SignupData.mobile,
      created_code:SignupData.created_code,
      key:this.otp_1
    }
    this.auth.postSidra_otp(otpdata) 
  } 

  onOtpChange(e:any){
    this.otp_1=e
    this.button_active=this.otp_1.length==5?true:false
  }

  reSendOtp(){
    let sData:any = localStorage.getItem('userSignupdata')
    let SignupData:any = JSON.parse(sData)
    let resend={
      contact:SignupData.mobile
    }
    this.auth.resend(resend)
    this.observableTimer()
    this.button_active=false
  }

}
