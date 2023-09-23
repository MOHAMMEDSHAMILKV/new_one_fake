import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { GoogleMapsModule } from '@angular/google-maps'
// import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    PagesComponent,
    // TestComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    InfiniteScrollModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    // GoogleMapsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
