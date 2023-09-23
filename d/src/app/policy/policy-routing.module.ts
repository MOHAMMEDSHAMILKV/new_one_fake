import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiepolicyComponent } from '../pages/cookiepolicy/cookiepolicy.component';
import { DatapolicyComponent } from '../pages/datapolicy/datapolicy.component';
import { GenaralpolicyComponent } from '../pages/genaralpolicy/genaralpolicy.component';
import { PrivacypolicyComponent } from '../pages/privacypolicy/privacypolicy.component';
import { SecuritypolicyComponent } from '../pages/securitypolicy/securitypolicy.component';
import { TermsofuseComponent } from '../pages/termsofuse/termsofuse.component';
import { PolicyComponent } from './policy.component';

const routes: Routes = [
{
  path: '', component: PolicyComponent, children: [
    { path: 'security', component: SecuritypolicyComponent },
    { path: '', component: PrivacypolicyComponent },
    { path: 'general',  component: GenaralpolicyComponent },
    { path: 'data', component: DatapolicyComponent },
    { path: 'cookie', component: CookiepolicyComponent },
    { path: 'termsUse', component: TermsofuseComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
