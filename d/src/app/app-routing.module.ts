import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
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
import { FaqComponent } from './pages/faq/faq.component';
import { DeslsCateComponent } from './pages/desls-cate/desls-cate.component';
import { PrefrenceComponent } from './pages/prefrence/prefrence.component';
import { ReviewlistpageComponent } from './pages/reviewlistpage/reviewlistpage.component';
import { HeaderComponent } from './components/header/header.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { TestComponent } from './pages/test/test.component';
import { ReturnComponent } from './pages/return/return.component';
import { AboutComponent } from './pages/about/about.component';
import { CareerComponent } from './pages/career/career.component';
import { OfferComponent } from './pages/offer/offer.component';

const routes: Routes = [ 
  { path: 'productGroup/:data', component: CategoryComponent },
  { path: 'dealsCate/:name', component: DeslsCateComponent },
  { path: 'division/:name', component: DivisionComponent },
  { path: 'deals/:name', component: GetdealsComponent }, 
  { path: 'search/:name', component: SearchComponent },
  { path: 'sidra-profile', loadChildren: () => import("./pages/sidra-profile/sidra-profile.module").then(m => m.SidraProfileModule) },
  { path: 'auth', loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule) },
  { path: 'privacyPolicy', loadChildren: () => import("./policy/policy.module").then(m => m.PolicyModule) },
  { path: '', component: HomeComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout/:name', component: CheckoutComponent},
  { path: 'product/:id', component: ProductComponent,data: {title: 'About'} },                                
  { path: 'security-policy',component:SecuritypolicyComponent},
  { path: 'refund-return',component:ReturnrefundComponent},
  { path: 'cookie-policy',component:CookiepolicyComponent},
  { path: 'warranty-policy',component:WarantypolicyComponent},
  { path: 'genaral-policy',component:GenaralpolicyComponent},
  { path: 'order-success',component:SuccessorderComponent},
  { path:'succes_cashon',component:CashondeliveryComponent},
  { path:'faq',component:FaqComponent},
  { path:'notification-prefrence',component:PrefrenceComponent},
  { path: 'faqs', loadChildren: () => import("./pages/faqs/faqs.module").then(m => m.FaqsModule) },
  { path:'reviewList',component:ReviewlistpageComponent},
  { path:'wishlist/:key',component:WishlistComponent},
  { path:'termsanduse',component:TermsofsalesComponent},
  { path:'test',component:TestComponent},
  { path:'returnandreplacement/:id',component:ReturnComponent},
  {path:'aboutus',component:AboutComponent}, 
  {path:'career',component:CareerComponent},
  {path:'offer',component:OfferComponent}
  // {path: 'page', loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule) },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled',})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
