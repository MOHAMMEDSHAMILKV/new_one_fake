import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DealsService } from 'src/app/services/deals.service';

@Component({
  selector: 'app-body-measure',
  templateUrl: './body-measure.component.html',
  styleUrls: ['./body-measure.component.scss']
})
export class BodyMeasureComponent implements OnInit {
  upperWear:any=[
    {"size":"XS"},{"size":"S"},{"size":"M"},{"size":"L"},
    {"size":"XL"},{"size":"XXL"},{"size":"XXXL"},{"size":"XXXL"}
  ]
  upperWearNum:any=[
    {"size":"26"},{"size":"28"},{"size":"30"},{"size":"32"},{"size":"34"},{"size":"36"},
    {"size":"38"},{"size":"40"},{"size":"42"},{"size":"44"},{"size":"46"},{"size":"48"}
  ]

  innerWear:any=[
    {"size":"70-75"},{"size":"75-80"},{"size":"80-85"}
    ,{"size":"85-90"},{"size":"90-95"}
  ]

  footwear:any=[
    {"size":"5"},{"size":"5.5"},{"size":"6"},{"size":"6.5"},
    {"size":"7"},{"size":"7.5"},{"size":"8"},{"size":"8.5"}
  ]

  hipsArray:any=[
    {"size":"23"},
    {"size":"25"},
    {"size":"36"}
  ]

  selectedUser:any
  upperAlpha:any
  upperNum:any
  inner:any
  foot:any
  gender:any="Select the Gende"
  weight:any
  height:any
  Waist:any 
  ft:any
  inch:any 
  sleeve:any
  UpperWear:any
  InnerWear:any
  FootWear:any
  UpperAlpha:any
  hips:any
  Chest:any
  slimFit:any
  type:any
  fullBodyMesure:any
  fullBodyMesureArray:any=[]
  upperwearAlphaIndex:any
  constructor(private auth:AuthService,
              private deals:DealsService) { }

  ngOnInit(): void {
    this.deals.getUserMesurment().subscribe((data:any)=>{
      this.fullBodyMesure=data.data
      this.fullBodyMesureArray.push(data.dat)
      if(this.fullBodyMesure.gender=='M'){
        this.gender="Male"
      }else if(this.fullBodyMesure.gender=='F'){
        this.gender="Female"
      }  
      this.weight=this.fullBodyMesure?.weight
      this.ft=this.fullBodyMesure?.Height.Feet
      this.inch=this.fullBodyMesure?.Height.Inch
      this.slimFit=this.fullBodyMesure?.fit 
      this.sleeve=this.fullBodyMesure?.custom_fit?.sleeve
      this.Chest=this.fullBodyMesure?.custom_fit?.Chest
      this.Waist=this.fullBodyMesure?.custom_fit?.waist
      this.type=this.fullBodyMesure?.type
      this.hips=this.fullBodyMesure?.custom_fit?.hips
    })
  }
  change(d:any){
  }

  onSelect(index:any,check:any,data:any): void {
    if(check=='upperAlpha'){
      this.upperAlpha = index;
      this.UpperAlpha=data
    }
    if(check=='upperNum'){
      this.upperNum = index;
      this.UpperWear=data
    }
    if(check=='inner'){
      this.inner = index;
      this.InnerWear=data
    }
    if(check=='foot'){
      this.foot = index;
      this.FootWear=data
    }
  }   

  redio(e:any){
    this.type=e
  }

  UpdateBodyMesurment(){
    if(this.gender=="Select the Gende"){
      this.gender=null
    } 
    let height:any={
      Feet:this.ft,
      Inch:this.inch
    }
    let custom_fit:any={
      sleeve:this.sleeve,
      waist:this.Waist,
      hips:this.hips,
      Chest:this.Chest
    }
    let final:any={
      footwear:this.FootWear,
      upper_wear_size:this.UpperAlpha,
      lower_wear_size:this.UpperWear,
      gender:this.gender,
      weight:this.weight,
      custom_fit:custom_fit,
      Height:height,
      fit:this.slimFit,  
      type:this.type
    }  
    this.auth.bodyMesure(final)  
  }

}
