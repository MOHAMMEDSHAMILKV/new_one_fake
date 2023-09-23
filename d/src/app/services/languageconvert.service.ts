import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageconvertService {
  demo:any
  constructor(private http:HttpClient,
              ) { }

  transformConvert(value: any) {
    
  } 
  
}
