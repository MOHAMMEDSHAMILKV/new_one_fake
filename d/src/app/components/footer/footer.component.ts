import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerCreditLink = environment.footer_credit_link
  footerCreditText = environment.footer_credit_text
  social_media = environment.social_media
  playstore = environment.apps.playstore
  appstore = environment.apps.appstore
  isLogin=false
  groceryArray:any=[]
  bulkArray:any=[]
  smartArray:any=[]
  languageShow:any
  constructor(private _productService:ProductService,
              private router: Router,
              public translate: TranslateService,) { 
                let language:any = localStorage.getItem('languageName')
                this.languageShow = JSON.parse(language) 
                translate.addLangs(['en', 'arb']); 
                if(this.languageShow=="rtl"){
                  translate.setDefaultLang('arb'); 
                  const browserLang = translate.getBrowserLang();
                  translate.use('arb');
                }else{
                  translate.setDefaultLang('en'); 
                  const browserLang = translate.getBrowserLang();
                  translate.use('en');
                }
              }


  ngOnInit(): void {
    let user:any = localStorage.getItem("marketplaceUser")
    let userData = JSON.parse(user)
    if(userData !=null){
      this.isLogin=true
    }
    let specialGroup="groceries"
    let smart ="smart"
    let bulk ="bulk"
    
    // this._productService.getHomeMainSlotOne(specialGroup).subscribe((data:any)=>{
    //   this.groceryArray = data?.data?.products
    // })
    // this._productService.getHomeMainSlotOne(smart).subscribe((data:any)=>{
    //   this.smartArray = data?.data?.products
      
    // })
    // this._productService.getHomeMainSlotOne(bulk).subscribe((data:any)=>{
    //   this.bulkArray = data?.data?.products
    // })
    let language:any = localStorage.getItem('languageName')
    this.languageShow = JSON.parse(language)
  }
  // scrollUp(){
  //   window.scrollTo(0, 0);
  // }
  routerLink(name:any,code:any,group:any,id:any){
    this.router.navigate(['/division/' + name+'_$_'+ code+'_$_'+group+'_$_'+id+'_$_'+'category'])

  }

  sendEmail() {
    const organizationEmail = 'care@sidrabazar.com';
    const emailSubject = 'Subject';
    const mailtoLink = `mailto:${organizationEmail}?subject=${encodeURIComponent(emailSubject)}`;
    
    window.location.href = mailtoLink;
  }

}
