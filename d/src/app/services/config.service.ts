import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // public config_url="url";
  
  constructor(private router: Router) {}
}
