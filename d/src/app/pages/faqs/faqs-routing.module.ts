import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './faqs.component';
import { HomepagesComponent } from './homepages/homepages.component';

const routes: Routes = [
  {path:'',component:FaqsComponent,children:[
    {path: '', redirectTo:'faqhome', pathMatch: 'full'},
    {path:'faqhome',component:HomepagesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqsRoutingModule { }
