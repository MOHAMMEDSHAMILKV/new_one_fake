import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courosel-slider',
  templateUrl: './courosel-slider.component.html',
  styleUrls: ['./courosel-slider.component.scss']
})
export class CouroselSliderComponent implements OnInit {
  divisionLink="/division/"
  groupLink="/productGroup/"
  @Input()bannerList:any = [
    {
      code: "BLOCK1000",
      content: "https://rgc-marketplace-product-hub.s3.amazonaws.com/all_images/003.jpg",
      display_name: "Header slot3",
      id: 22,
      page_name: "Home page",
      priorty: 6,
      redirecturl: "6",
      slot_name: "Header slot3",
    },
  ]

 @Input() directions="ltr"
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  routeTo(type:string,name:string, id:number, section:any,code:any,redirect:any){
    if(redirect == "Category"){
      // this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
      return `#${this.divisionLink}${name}_$_${code}_$_${section}_$_${id}_$_category` 
    }else if(redirect=='Division'){
      return `#${this.divisionLink}${name}_$_${code}_$_division_$_${id}_$_division` 
    }
    else{
      if(redirect == 'Category'){
        // this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_category`
      }else{
        // this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_group`
      }
    }
  }

 
  link(type:string,name:string, id:number, section:any,code:any,redirect:any){
    if(type === "Category"){
      this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
      
    }else{
      if(redirect == 'Category'){
        this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
      }else{
        this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
      }
    }
  }

  // demo(type:string,name:string, id:number, section:any,code:any,redirect:any){
  //     return this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
  // }
}
