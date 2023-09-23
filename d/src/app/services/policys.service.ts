import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PolicysService {
  policys:any = []
  api_system_arch = environment.api_system_arch
  policyApi = "/policy/list-policies-by-category/1"
  constructor(private http: HttpClient) {
    
   }
  
  getPolicy(){
    return this.http.get<any>(this.api_system_arch+this.policyApi)
  } 
}
