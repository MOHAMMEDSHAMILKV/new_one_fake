import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deal-card-one',
  templateUrl: './deal-card-one.component.html',
  styleUrls: ['./deal-card-one.component.scss']
})
export class DealCardOneComponent implements OnInit {
  @Input() parent:any =[
    {
      id: 1,   
      image: "http://placeimg.com/640/480/transport",
      redirect_type: "group",
      redirecturl: "OFFER",
      redirect_id: 1,
      redirect_code:0,
      display_name: "Best of month !",
      Priorty: 1,
      section_type: "essential",
      child : [
        {
            id: 1,
            image: "http://placeimg.com/640/480/technics",
            redirect_type: "group",
            redirecturl: "OFFER",
            redirect_id: 1,
            redirect_code:0,
            display_name: "Best of month !",
            section_type: "essential",
        }
      ]
    }
  ]
  is_wishlisted=false
  divisionLink="/division/"
  groupLink="/productGroup/"
  limit=25
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  
  }
  
  navigateParent(type:string,name:any,id:number,code:any,section:any){
    if(type === "Category"){
      this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
    }else{
      if(type == 'Category'){
        this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
      }else{
        this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
      }
    }
  }

  navigateChild(type:string,name:any,id:number,code:any,section:any){
    if(type === "Category"){
      this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
    }else{
      if(type == 'Category'){
        this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
      }else{
        this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
      }
    }
  }
  routeTo(type:string,name:string, id:number, section:any, code:any){
    if(type === "Category"){
      // this.router.navigate(['division/'+ name+'_$_'+ code+'_$_'+section+'_$_'+id+'_$_'+'category'])
      return `#${this.divisionLink}${name}_$_${code}_$_${section}_$_${id}_$_category`
    }else{
      if(type == 'Category'){
        // this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'category'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_category`
      }else{
        // this.router.navigate(['productGroup/'+code+'_$_'+ name +'_$_'+section+'_$_'+id+'_$_'+'group'])
        return `#${this.groupLink}${code}_$_${name}_$_${section}_$_${id}_$_group`
      }
    }
  }
  clickRoute(code:any,type:any,name:any){
    // alert("hi")
    
    this.router.navigate(['/productGroup/'+code+'_$_'+type+'_$_'+name])
    // this.ifHeaderActive=false
  }
}
