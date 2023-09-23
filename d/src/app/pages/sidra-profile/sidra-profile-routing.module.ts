import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BodyMeasureComponent } from './body-measure/body-measure.component';
import { BusinessaccountComponent } from './businessaccount/businessaccount.component';
import { BuyitagagainComponent } from './buyitagagain/buyitagagain.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MessageToUsComponent } from './message-to-us/message-to-us.component';
import { NotificationComponent } from './notification/notification.component';
import { OdrerdetailComponent } from './odrerdetail/odrerdetail.component';
import { OrdersComponent } from './orders/orders.component';
import { ReviewComponent } from './review/review.component';
import { SettingComponent } from './setting/setting.component';
import { SidraProfileComponent } from './sidra-profile.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  {path:'',component:SidraProfileComponent,children:[
    {path: '', redirectTo:'sidra-profile-edit', pathMatch: 'full'},
    {path:'sidra-profile-edit',component:EditProfileComponent},
    {path:'changePassword',component:ChangePasswordComponent},
    {path:'review',component:ReviewComponent},
    {path:'measure',component:BodyMeasureComponent},
    {path:'orders',component:OrdersComponent},
    {path:'address/:name',component:AddressComponent},
    {path:'notification',component:NotificationComponent},
    {path:'wallet',component:WalletComponent},
    {path:'businessaccount',component:BusinessaccountComponent},
    {path:'setting',component:SettingComponent},
    {path:"message",component:MessageToUsComponent},
    {path:'orderdetail/:id',component:OdrerdetailComponent},
    {path:'buyit',component:BuyitagagainComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidraProfileRoutingModule { }
 