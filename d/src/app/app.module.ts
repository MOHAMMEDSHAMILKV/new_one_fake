import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GoogleMapsModule } from '@angular/google-maps'
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { HttpClientModule, HttpClient,HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule,Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ToastrModule } from 'ngx-toastr';
import { ImgMagnifier } from "ng-img-magnifier";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ComponentsModule } from './components/components.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductService } from './services/product.service';
import { ProductComponent } from './pages/product/product.component';
import { ReviewRatingComponent } from './pages/product/review-rating/review-rating.component';
import { DescriptionComponent } from './pages/product/description/description.component';
import { AuthModule } from './pages/auth/auth.module';
import { CategoryComponent } from './pages/category/category.component';
import { LifestyleComponent } from './pages/home/lifestyle/lifestyle.component';
import { BulkComponent } from './pages/home/bulk/bulk.component';
import { EssentialComponent } from './pages/home/essential/essential.component';
import { AroundworldComponent } from './pages/home/aroundworld/aroundworld.component';
import { DivisionComponent } from './pages/division/division.component';
import { GetdealsComponent } from './pages/getdeals/getdeals.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { TermsofsalesComponent } from './pages/termsofsales/termsofsales.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { DatapolicyComponent } from './pages/datapolicy/datapolicy.component';
import { SecuritypolicyComponent } from './pages/securitypolicy/securitypolicy.component';
import { ReturnrefundComponent } from './pages/returnrefund/returnrefund.component';
import { CookiepolicyComponent } from './pages/cookiepolicy/cookiepolicy.component';
import { WarantypolicyComponent } from './pages/warantypolicy/warantypolicy.component';
import { GenaralpolicyComponent } from './pages/genaralpolicy/genaralpolicy.component';
import { SuccessorderComponent } from './pages/successorder/successorder.component';
import { CashondeliveryComponent } from './pages/cashondelivery/cashondelivery.component';
import { CareerComponent } from './pages/career/career.component';
import { AuthintersectorInterceptor } from './authintersector.interceptor';
import { FaqComponent } from './pages/faq/faq.component';
import { DesignlayoutComponent } from './pages/designlayout/designlayout.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {CalendarModule} from 'primeng/calendar';
import {TabMenuModule} from 'primeng/tabmenu';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { LanguageCustomPipe } from './language-custom.pipe';
import { PipeModule } from './pipe/pipe.module';
import { DeslsCateComponent } from './pages/desls-cate/desls-cate.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { CdTimerModule } from 'angular-cd-timer';
import { PrefrenceComponent } from './pages/prefrence/prefrence.component';
import { TermscoditionComponent } from './pages/termscodition/termscodition.component';
import { ReviewlistpageComponent } from './pages/reviewlistpage/reviewlistpage.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { TestComponent } from './pages/test/test.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { UniquePipe } from './unique.pipe';
import { ReturnComponent } from './pages/return/return.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AboutComponent } from './pages/about/about.component';
import { OfferComponent } from './pages/offer/offer.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
} 


@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    ReviewRatingComponent,
    DescriptionComponent,
    CategoryComponent,
    LifestyleComponent,
    BulkComponent,
    EssentialComponent,
    AroundworldComponent,
    DivisionComponent,
    GetdealsComponent,
    SearchComponent,
    PrivacypolicyComponent,
    TermsofsalesComponent,
    TermsofuseComponent,
    DatapolicyComponent,
    SecuritypolicyComponent,
    ReturnrefundComponent,
    CookiepolicyComponent,
    WarantypolicyComponent,
    GenaralpolicyComponent,
    SuccessorderComponent,
    CashondeliveryComponent,
    CareerComponent,
    FaqComponent,
    DesignlayoutComponent,
    LanguageCustomPipe,
    DeslsCateComponent,
    PrefrenceComponent,
    TermscoditionComponent,
    ReviewlistpageComponent,
    WishlistComponent,
    TestComponent,
    UniquePipe,
    ReturnComponent,
    AboutComponent,
    OfferComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    InputTextModule,
    ComponentsModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    ImgMagnifier,
    ClipboardModule,
    NgxStarRatingModule,
    CalendarModule,
    TabMenuModule,
    PipeModule,
    Ng2TelInputModule,
    CdTimerModule,
    GoogleMapsModule,
    MatIconModule,
    GooglePlaceModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule
  ],
  exports:[
    LanguageCustomPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [Title,ProductService,{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { } 
