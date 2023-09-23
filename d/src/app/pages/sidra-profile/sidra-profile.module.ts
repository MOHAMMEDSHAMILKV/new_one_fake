import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import { NgOtpInputModule } from  'ng-otp-input';

import { SidraProfileRoutingModule } from './sidra-profile-routing.module';
import { SidraProfileComponent } from './sidra-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReviewComponent } from './review/review.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import {RatingModule} from 'primeng/rating';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BodyMeasureComponent } from './body-measure/body-measure.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressComponent } from './address/address.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {DialogModule} from 'primeng/dialog';
import { NotificationComponent } from './notification/notification.component';
import { WalletComponent } from './wallet/wallet.component';
import { BusinessaccountComponent } from './businessaccount/businessaccount.component';
import { ChatboatComponent } from './chatboat/chatboat.component';
import { SettingComponent } from './setting/setting.component';
import { MessageToUsComponent } from './message-to-us/message-to-us.component';
import { OdrerdetailComponent } from './odrerdetail/odrerdetail.component';
import { BuyitagagainComponent } from './buyitagagain/buyitagagain.component';
import { ComponentsModule } from 'src/app/components/components.module';
// import { GoogleMapsModule } from '@angular/google-maps'
import { MatIconModule } from '@angular/material/icon';

@NgModule({ 
  declarations: [
    SidraProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ReviewComponent,
    BodyMeasureComponent,
    OrdersComponent,
    AddressComponent,
    NotificationComponent,
    WalletComponent,
    BusinessaccountComponent,
    ChatboatComponent,
    SettingComponent,
    MessageToUsComponent,
    OdrerdetailComponent,
    BuyitagagainComponent
  ],
  imports: [
    CommonModule,
    SidraProfileRoutingModule,
    NgbModule,
    NgbRatingModule,
    RatingModule,
    FormsModule,
    CalendarModule,
    NgOtpInputModule,
    MatInputModule,
    MatFormFieldModule,
    Ng2TelInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DialogModule ,
    ComponentsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  
})
export class SidraProfileModule { }
