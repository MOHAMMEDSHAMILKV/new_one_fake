import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsComponent } from './faqs.component';
import { HomepagesComponent } from './homepages/homepages.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FaqsComponent,
    HomepagesComponent
  ],
  imports: [
    CommonModule,
    FaqsRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class FaqsModule { }
