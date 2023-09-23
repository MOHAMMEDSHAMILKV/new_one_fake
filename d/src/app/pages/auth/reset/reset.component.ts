import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  passwordFeild1= "password"
  passwordFeild2= "password"
  resetRoute= { name:String};
  isForgot = false
  firstFeild = ""
  secondFeild = ""
  email = ""
  otpData:any
  passwordStrength1=""
  passwordStrength2=""
  passwordStrength3=""
  passwordStrength4=""
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public thresholds = [90, 75, 45, 25];
  constructor(private toaster: ToastrService,private _router:Router,private messenger:MessengerService,private auth:AuthService,private route: ActivatedRoute) {
    
    
   }

  ngOnInit(): void {
    this.resetRoute ={
      name: this.route.snapshot.params['name'],
    }
    let mail = localStorage.getItem('forgotmail')
    

    if(mail != null){
      this.email = mail
      this.isForgot = true
    }else{
      this.isForgot =false
    }

    this.messenger.getForgotOtpConfirm().subscribe((otpData:any)=>{
      this.otpData = otpData
      this.email = otpData.email
      this.auth.postForgotOtp(otpData).subscribe((data:any)=>{
        setTimeout(() => {
          if(data.status == 'success'){
            this.isForgot = true
            // this.email=data.data.email
          }
        }, 1000);
      })
    })

    // let user:any = localStorage.getItem('marketplaceUser')
    // let userDetails = JSON.parse(user)
    // console.log(userDetails.token);
  }

  checkRoute(data:any){
    if(data == 'new'){
      return true
    }else{
      return false
    }
  }

  newPasswordCreate(){
    if(this.firstFeild == "" || this.email == "")return
    let forgotData = {
      newPassword : this.firstFeild,
      email: this.email
    }
    this.auth.createNewPasswordGet(forgotData).subscribe((data:any)=>{
      if(data.status == "success"){
        localStorage.removeItem('forgotmail')
        this._router.navigate(['/'])
        this.toaster.success(data.message)
      }else{
        this.toaster.warning(data.message)
      }
    })
  }

  changePassword(){
    if(this.firstFeild == "" || this.secondFeild == "")return
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user) 
    let changePassword = { 
      email: userDetails.email_id, 
      cpwd: this.firstFeild, 
      npwd: this.secondFeild  
    } 
    this.auth.changeCurrentPassword(changePassword)
    
  }

  showPassword1(){
    this.passwordFeild1 = 'text'
    setTimeout(() => {
      this.passwordFeild1 = 'password'
    }, 1100);
  }

  showPassword2(){
    this.passwordFeild2 = 'text'
    setTimeout(() => {
      this.passwordFeild2 = 'password'
    }, 1100);
  }
}
