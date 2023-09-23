import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  currentPass:any=""
  newpass:any=""
  userData:any
  username:any
  phoneNum:any
  otp_1=""
  passworWarning=false
  count=8
  btn_Active=false
  low=false
  medium=false 
  strong=false
  subscribeTimer = 20
  timeLeft = 20
  constructor(private auth:AuthService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
    this.auth.getUserProfile().subscribe((data:any)=>{
        this.username=data.data?.username
        this.phoneNum='+'+data?.data?.mobile_code+data.data?.mobile
    }) 
    
  }
  ngAfterViewInit(){
    window.scrollTo(0, 0);
  }



  onOtpChange(e:any){
    this.otp_1=e
    this.btn_Active=this.otp_1.length==5?true:false
  }
  
  sendOtp(){
    if(this.currentPass!=""&&this.newpass!=""){
      let otp={
        contact:'+91'+ this.phoneNum
      }
      this.auth.sendOtpRequest(otp)      
    }else{
      this.toastr.warning("Fill all the felid")
    }
  }

  otpVerifyFirst(){
    let pass={
      cpwd:this.currentPass,
      npwd:this.newpass,
      username:this.username
     }
     this.observableTimer()
    this.auth.sendChangePass(pass)
  }

  otpVerify(){
    let pass={
      cpwd:this.currentPass,
      npwd:this.newpass,
      username:this.username,
      otp:this.otp_1
     }
    this.auth.sendChangePass(pass)
  }

  passwordStrength(pass:any){
      this.passworWarning=pass.length>this.count?false:true
  }

  observableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      if (val > this.timeLeft) return
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  reSendOtp() {
    let pass={
      cpwd:this.currentPass,
      npwd:this.newpass,
      username:this.username
     }
     this.observableTimer()
    this.auth.sendChangePass(pass)

  }

}
