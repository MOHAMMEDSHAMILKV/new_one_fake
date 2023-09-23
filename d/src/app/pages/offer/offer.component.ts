import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor(private auth:AuthService,
              private http:HttpClient) { }
  userData:any
  offerData:any=[]
  paginationDetails:any
  isLoading=false
  ngOnInit(): void {
    let user:any = localStorage.getItem('marketplaceUser')
    this.userData = JSON.parse(user)
    this.isLoading=true
    console.log(this.userData ,"IIIIIIIIIIIIIIIIIIIIIIIIII");
    this.auth.getOfferProduct().subscribe((d:any)=>{
      this.offerData=d.data.results
      this.paginationDetails=d.data
      this.isLoading=false
    })
  }

  priviousData(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.isLoading=true
    if(this.paginationDetails?.previous!=null){
      this.http.get<any>(this.paginationDetails?.previous).subscribe((d:any)=>{
        this.offerData = d.data?.results
        this.isLoading=false
        this.paginationDetails=d.data
      }) 
    } 
      
  }

  nextData(){
    let user:any = localStorage.getItem('marketplaceUser')
    let userDetails = JSON.parse(user)
    let tokens=userDetails?.token
    let headers=new HttpHeaders({
      Authorization: ` ${tokens}`
    }) 
    this.isLoading=true
    if(this.paginationDetails?.next!=null){
      this.http.get<any>(this.paginationDetails?.next).subscribe((d:any)=>{
        this.offerData = d.data?.results
        this.paginationDetails=d.data
        this.isLoading=false
      })
    }
  }

}
