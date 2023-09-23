import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  forgotPassword=""
  is_valid:any
  otpPlatform=false
  error=false
  failedMsg=false
  timeLeft = 20
  subscribeTimer = 20
  key:any
  changePassword=false
  cus_pass:any
  hide=false
  hide2=false
  forgetPass=true
  confirm_pass:any
  btn_Active=false
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public thresholds = [90, 75, 45, 25];
  constructor(private toaster: ToastrService,
              private _router:Router,
              private messenger:MessengerService,
              private _auth:AuthService) { } 

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email])
    })
    this.is_valid = true
  }

  forgotSubmit(){
    if(this.forgotPassword==""){
      return
    }else{
      let forgot:any={
        username:this.forgotPassword
      }
      this._auth.forgotPasswordsidra(forgot)
      this.messenger.get().subscribe((data:any)=>{
        if(data=="success"){
          this.otpPlatform=true
          this.error=false
          this.forgetPass=false
          this.observableTimer()
          this.changePassword=false
        } else if(data=="failed"){
          this.otpPlatform=false
          this.error=true
          this.failedMsg=true
          this.forgetPass=true
          this.changePassword=false
        }
      })
    }  
  }


  onOtpChange(e:any){
    this.key=e
    this.btn_Active=this.key.length==5?true:false
  } 

  colorChange(){
    this.error=false
    this.failedMsg=false
  }

  observableTimer() {
    const source = timer(1000,1000);
    const abc = source.subscribe(val => {
      if(val > this.timeLeft) return 
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  resend(){
    this.otpPlatform=true
    this.changePassword=false
    this.forgetPass=false
    this.observableTimer()
    let forgot:any={
      username:this.forgotPassword
    }
    this._auth.forgotPasswordsidra(forgot)
  }

  forgotSubmitVerify(){
    let forgot={
      username:this.forgotPassword,
      key:this.key
    }
    this._auth.forgortPassSidraVerify(forgot)
    this.messenger.get().subscribe((data:any)=>{
      if(data=="success"){
        this.otpPlatform=false
        // this.error=false
        this.changePassword=true
        this.subscribeTimer=0
        this.otpPlatform=false
      } else if(data=="failed"){
        this.otpPlatform=true
        this.changePassword=false
        this.forgetPass=false
        // this.error=true
        // this.failedMsg=true
        this.subscribeTimer=0
      }
    })
  }

  confirmPassword(){
    if (this.cus_pass === this.confirm_pass) {
      let forgot={
        username:this.forgotPassword,
        key:this.key,
        pswd:this.confirm_pass
      }
      this._auth.forgortPassSidraVerify(forgot)
      this.messenger.get().subscribe((data:any)=>{
        if(data=="success"){
            this._router.navigate(['/auth'])
        } else if(data=="failed"){
          this.otpPlatform=false
          this.changePassword=true
          this.forgetPass=false
          // this.error=true
          // this.failedMsg=true
          this.subscribeTimer=0
        }
      })
    } 
    else{
        this.toaster.error("password is missmatched")
    }
  }


  
}
