import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 


@Injectable()
export class AuthintersectorInterceptor implements HttpInterceptor {
  api_user = environment.api_user;
  geturl:any;
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.geturl=this.api_user+request;
    let Request;
    if(request.url.includes("user-account_userchangepassword")){
      let user:any = localStorage.getItem('marketplaceUser') 
      let userDetails = JSON.parse(user)
      let tokens=userDetails.token
         Request=request.clone({url:this.geturl,setHeaders:{Authorization: `token ${tokens}`}});
    }
    else{
      Request=request.clone({url:this.geturl})
    }
    return next.handle(Request);
    
  }
}
