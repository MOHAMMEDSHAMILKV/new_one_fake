import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-popular-category',
  templateUrl: './popular-category.component.html',
  styleUrls: ['./popular-category.component.scss']
})
export class PopularCategoryComponent implements OnInit {

  constructor(private router: Router,
              private cate:CategoryService) {}
  @Input() parentLink = "/category/"
  @Input() count= 9
  @Input() group = ""
  @Input() popular_category:any=
  {    
    value:[
      {
        id:1,
        name: "Fruits & vegetables",
        image: "../../../assets/Fruits & Vegitables/orange.png",
        priorty: 1,
        redirecturl: "",
        code: ""
      }
    ]
  }

  checkLink:any
  
  ngOnInit(): void {}
  
  routeLink(name:any,group:any,id:any,code:any){
      if(this.parentLink === "/productGroup/"){
        if(this.checkLink=='group'){
          return `#${this.parentLink}${code}_$_${name}_$_${group}_$_${id}_$_group`
        }else{
          return `#${this.parentLink}${code}_$_${name}_$_${group}_$_${id}_$_category`
        } 
      }else{
        return `#${this.parentLink}${name}_$_${code}_$_${group}_$_${id}_$_category`
      } 
  }

 demoTest(code:any){
  //  this.cate.getVerifytheCode(code).subscribe((data:any)=>{
  //    this.checkLink=data.data
     
  //  })
  }



  clickRoute(code:any,type:any,name:any,route:any){
    // alert("hi")
    this.router.navigate(['/productGroup/'+code+'_$_'+type+'_$_'+name+'_$_'+route])
    // this.ifHeaderActive=false
  }

}
