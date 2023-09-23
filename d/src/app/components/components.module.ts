import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductCardOneComponent } from '../components/product-card-one/product-card-one.component';
import { BannerComponent } from '../components/banner/banner.component';
import { DealsComponent } from '../components/deals/deals.component';
import { DealCardOneComponent } from '../components/deal-card-one/deal-card-one.component';
import { PersonalStoreComponent } from '../components/personal-store/personal-store.component';
import { ProductSliderComponent } from '../components/product-slider/product-slider.component';
import { BranchComponent } from '../components/branch/branch.component';
import { AddSliderComponent } from '../components/add-slider/add-slider.component';
import { BranchBannerComponent } from '../components/branch-banner/branch-banner.component';
import { CouroselSliderComponent } from './courosel-slider/courosel-slider.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BranchSliderComponent } from './branch-slider/branch-slider.component';
import { MainCategoryComponent } from './main-category/main-category.component';
import { PopularCategoryComponent } from './popular-category/popular-category.component';
import { ProductCardTwoComponent } from './product-card-two/product-card-two.component';
import { ProductSliderTwoComponent } from './product-slider-two/product-slider-two.component';
import { ProductCardThreeComponent } from './product-card-three/product-card-three.component';
import { ProductSliderThreeComponent } from './product-slider-three/product-slider-three.component';
import { ProductCardFourComponent } from './product-card-four/product-card-four.component';
import { ProductSliderFourComponent } from './product-slider-four/product-slider-four.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { ReceiptComponent } from './cart-item/receipt/receipt.component';
import {ClickOutsideDirective } from 'ng-multiselect-dropdown/click-outside.directive';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {DialogModule} from 'primeng/dialog';
import { PipeModule } from '../pipe/pipe.module';
import {TabMenuModule} from 'primeng/tabmenu';
import { SidraheaderComponent } from './sidraheader/sidraheader.component';
import { SidraCartItemsComponent } from './sidra-cart-items/sidra-cart-items.component';
import { AdressgenerationComponent } from './adressgeneration/adressgeneration.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { TruncatePipe } from '../truncate.pipe';
import { Footer2Component } from './footer2/footer2.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { LoadingComponent } from './loading/loading.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductCardOneComponent,
    BannerComponent,
    DealsComponent,
    DealCardOneComponent,
    PersonalStoreComponent,
    ProductSliderComponent,
    BranchComponent,
    AddSliderComponent,
    BranchBannerComponent,
    CouroselSliderComponent,
    CartItemComponent,
    BranchSliderComponent,
    MainCategoryComponent,
    PopularCategoryComponent,
    ProductCardTwoComponent,
    ProductSliderTwoComponent,
    ProductCardThreeComponent,
    ProductSliderThreeComponent,
    ProductCardFourComponent,
    ProductSliderFourComponent,
    OrderItemComponent,
    ReceiptComponent,
    SidraheaderComponent,
    SidraCartItemsComponent,
    AdressgenerationComponent,
    TruncatePipe,
    Footer2Component,
    MenuHeaderComponent,
    LoadingComponent
  ],
  imports: [
    GoogleMapsModule,
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    NgbRatingModule,
    DialogModule,
    PipeModule,
    TabMenuModule,
    NgOtpInputModule,
    GooglePlaceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ProductCardOneComponent,
    BannerComponent,
    DealsComponent,
    DealCardOneComponent,
    PersonalStoreComponent,
    ProductSliderComponent,
    BranchComponent,
    AddSliderComponent,
    BranchBannerComponent,
    CouroselSliderComponent,
    CartItemComponent,
    MainCategoryComponent,
    PopularCategoryComponent,
    ProductCardTwoComponent, 
    ProductSliderTwoComponent,
    ProductCardThreeComponent,
    ProductSliderThreeComponent,
    ProductCardFourComponent,
    ProductSliderFourComponent,
    OrderItemComponent,
    NgxStarRatingModule,
    SidraheaderComponent,
    SidraCartItemsComponent,
    AdressgenerationComponent,
    Footer2Component,
    MenuHeaderComponent,
    LoadingComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class ComponentsModule { }
