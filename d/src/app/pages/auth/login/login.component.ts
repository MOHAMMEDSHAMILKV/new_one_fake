import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessengerService } from 'src/app/services/messenger.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordFeild= "password"
  hide = true;
  isLoading=false
  constructor(private messageService:MessengerService, private auth:AuthService, private router:Router) { 
    let user:any = localStorage.getItem("marketplaceUser")
    if(JSON.parse(user) != null){
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    }); 
    
  }

  showPassword(){
    this.passwordFeild = 'text'
    setTimeout(() => {
      this.passwordFeild = 'password'
    }, 1100);
  }
  
  OnLoginSubmit(){
    // if(this.loginForm.invalid) return
    let auth = {
      user_name: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.loginPost(auth)
    if(!this.loginForm.value.email||!this.loginForm.value.password)return
    this.isLoading = true;
    this.messageService.getStatus().subscribe((D:any)=>{ 
      if(D=='success'){
        this.isLoading = false; 
        setTimeout( () => { 
          window.location.reload()
        }, 800);
      }
      else if(D=='failed'){
        this.isLoading = false; 
      }
    })
  }

  
}
