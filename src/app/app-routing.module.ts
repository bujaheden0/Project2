import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent }  from './landing-page/landing-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ProfileComponent } from './profile/profile.component';
import {TestValidateComponent} from './test-validate/test-validate.component';
import { AuthenticationService } from './services/authentication.service';
import { MapComponent } from './map/map.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'signup', component : SignUpComponent},
  { path: 'signin', component : SignInComponent},
  { path: 'questionnaire', component : QuestionnaireComponent},
  { path: 'profile', component : ProfileComponent },
  { path: 'test', component : TestValidateComponent},
  { path: 'map', component : MapComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { 


}
